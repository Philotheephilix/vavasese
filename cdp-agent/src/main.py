import os
import sys
import time
import uuid
from flask import Flask, request, render_template, jsonify, send_from_directory
import base64
import requests
import io
import json
from PIL import Image

from coinbase_agentkit import (
    AgentKit,
    AgentKitConfig,
    EthAccountWalletProvider,
    EthAccountWalletProviderConfig,
    erc20_action_provider,
    pyth_action_provider,
    wallet_action_provider,
    weth_action_provider,
)
from coinbase_agentkit_langchain import get_langchain_tools
from dotenv import load_dotenv
from eth_account import Account
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure a file to persist the agent's CDP API Wallet Data.
wallet_data_file = "wallet_data.txt"

# Ensure necessary environment variables are set
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
assert HUGGINGFACE_API_KEY, "You must set the HUGGINGFACE_API_KEY environment variable"

# Ensure CDP Private Key is set
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
assert PRIVATE_KEY, "You must set the PRIVATE_KEY environment variable"
assert PRIVATE_KEY.startswith("0x"), "Private key must start with 0x hex prefix"

# Smart contract details
GRIEVANCE_CONTRACT_ADDRESS = os.getenv("GRIEVANCE_CONTRACT_ADDRESS")
assert GRIEVANCE_CONTRACT_ADDRESS, "You must set the GRIEVANCE_CONTRACT_ADDRESS environment variable"

# ABI for GrievanceRegistry contract
GRIEVANCE_CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "_title", "type": "string"},
            {"internalType": "string", "name": "_description", "type": "string"},
            {"internalType": "string", "name": "_category", "type": "string"},
            {"internalType": "string", "name": "_location", "type": "string"},
            {"internalType": "uint256", "name": "_mediaCount", "type": "uint256"},
            {"internalType": "string", "name": "_priorityLevel", "type": "string"},
            {"internalType": "uint256", "name": "_estimatedDays", "type": "uint256"},
            {"internalType": "uint256", "name": "_fundAmount", "type": "uint256"},
            {"internalType": "string", "name": "_currency", "type": "string"},
            {"internalType": "string", "name": "_aiJustification", "type": "string"},
            {"internalType": "string", "name": "_trackingId", "type": "string"}
        ],
        "name": "submitGrievance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "_trackingId", "type": "string"}],
        "name": "markResolved",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "_trackingId", "type": "string"}],
        "name": "getGrievance",
        "outputs": [
            {
                "components": [
                    {"internalType": "string", "name": "title", "type": "string"},
                    {"internalType": "string", "name": "description", "type": "string"},
                    {"internalType": "string", "name": "category", "type": "string"},
                    {"internalType": "string", "name": "location", "type": "string"},
                    {"internalType": "uint256", "name": "mediaCount", "type": "uint256"},
                    {"internalType": "string", "name": "priorityLevel", "type": "string"},
                    {"internalType": "uint256", "name": "estimatedDays", "type": "uint256"},
                    {"internalType": "uint256", "name": "fundAmount", "type": "uint256"},
                    {"internalType": "string", "name": "currency", "type": "string"},
                    {"internalType": "string", "name": "aiJustification", "type": "string"},
                    {"internalType": "string", "name": "trackingId", "type": "string"},
                    {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                    {"internalType": "address", "name": "submitter", "type": "address"},
                    {"internalType": "bool", "name": "resolved", "type": "bool"}
                ],
                "internalType": "struct GrievanceRegistry.Grievance",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllGrievances",
        "outputs": [
            {
                "components": [
                    {"internalType": "string", "name": "title", "type": "string"},
                    {"internalType": "string", "name": "description", "type": "string"},
                    {"internalType": "string", "name": "category", "type": "string"},
                    {"internalType": "string", "name": "location", "type": "string"},
                    {"internalType": "uint256", "name": "mediaCount", "type": "uint256"},
                    {"internalType": "string", "name": "priorityLevel", "type": "string"},
                    {"internalType": "uint256", "name": "estimatedDays", "type": "uint256"},
                    {"internalType": "uint256", "name": "fundAmount", "type": "uint256"},
                    {"internalType": "string", "name": "currency", "type": "string"},
                    {"internalType": "string", "name": "aiJustification", "type": "string"},
                    {"internalType": "string", "name": "trackingId", "type": "string"},
                    {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                    {"internalType": "address", "name": "submitter", "type": "address"},
                    {"internalType": "bool", "name": "resolved", "type": "bool"}
                ],
                "internalType": "struct GrievanceRegistry.Grievance[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

def initialize_agent():
    """Initialize the CDP agent with Hugging Face CLIP for grievance analysis."""
    # Initialize LLM
    llm = ChatOpenAI(model="gpt-4o-mini")
    
    # Create Ethereum account from private key
    account = Account.from_key(PRIVATE_KEY)

    # Initialize Ethereum Account Wallet Provider
    wallet_provider = EthAccountWalletProvider(
        config=EthAccountWalletProviderConfig(account=account, chain_id="84532")
    )

    # Initialize AgentKit
    agentkit = AgentKit(
        AgentKitConfig(
            wallet_provider=wallet_provider,
            action_providers=[
                erc20_action_provider(),
                pyth_action_provider(),
                wallet_action_provider(),
                weth_action_provider(),
            ],
        )
    )

    # Get CDP tools from AgentKit
    cdp_tools = get_langchain_tools(agentkit)
    
    # Define custom tools for grievance analysis with HF CLIP
    def clip_image_analysis(image_base64, query=None):
        """
        Analyze image using CLIP model from Hugging Face.
        
        Args:
            image_base64 (str): Base64 encoded image
            query (str, optional): Text to compare with image
        
        Returns:
            dict: Analysis results from CLIP
        """
        API_URL = "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32"
        headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
        
        # Decode the base64 image
        image_data = base64.b64decode(image_base64)
        image = Image.open(io.BytesIO(image_data))
        
        # Convert image to bytes for API request
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        # Prepare data for the API
        if query:
            # If query is provided, use it for text-image similarity analysis
            data = {
                "inputs": {
                    "image": base64.b64encode(img_byte_arr).decode('utf-8'),
                    "text": query
                }
            }
        else:
            # Use general categories for grievance analysis
            categories = [
                "infrastructure damage", "environmental issue", "public safety hazard",
                "community concern", "service disruption", "vandalism", "accessibility issue",
                "noise complaint", "sanitation problem", "traffic issue"
            ]
            data = {
                "inputs": {
                    "image": base64.b64encode(img_byte_arr).decode('utf-8'),
                    "text": categories
                }
            }
        
        # Make API request
        response = requests.post(API_URL, headers=headers, json=data)
        return response.json()
    
    def clip_grievance_categorize(image_base64):
        """
        Categorize image for grievance assessment using CLIP.
        
        Args:
            image_base64 (str): Base64 encoded image
        
        Returns:
            dict: Categorization results with confidence scores
        """
        API_URL = "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32"
        headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
        
        # Decode the base64 image
        image_data = base64.b64decode(image_base64)
        
        # Define grievance categories to test against
        categories = [
            "road pothole", "broken street light", "graffiti vandalism", 
            "fallen tree", "water leak", "garbage dumping", "broken sidewalk", 
            "missing street sign", "flooding", "damaged public property"
        ]
        
        # Prepare data for zero-shot classification
        data = {
            "inputs": {
                "image": base64.b64encode(image_data).decode('utf-8'),
                "text": categories
            }
        }
        
        # Make API request
        response = requests.post(API_URL, headers=headers, json=data)
        clip_results = response.json()
        
        # Process the CLIP results to determine category and priority
        if isinstance(clip_results, list) and len(clip_results) > 0:
            # Find the highest scoring category
            highest_score = 0
            category = "unclassified"
            
            for item in clip_results:
                if item["score"] > highest_score:
                    highest_score = item["score"]
                    category = item["label"]
            
            # Map categories to priorities
            high_priority = ["water leak", "flooding", "fallen tree", "broken street light"]
            medium_priority = ["road pothole", "damaged public property", "missing street sign"]
            low_priority = ["graffiti vandalism", "garbage dumping", "broken sidewalk"]
            
            if category in high_priority:
                priority = "high"
                days = 3
            elif category in medium_priority:
                priority = "medium"
                days = 7
            else:
                priority = "low"
                days = 14
                
            return {
                "category": category,
                "priorityLevel": priority,
                "estimatedDays": days,
                "confidence": highest_score,
                "all_results": clip_results
            }
        else:
            # Default response if CLIP analysis fails
            return {
                "category": "unclassified",
                "priorityLevel": "medium",
                "estimatedDays": 7,
                "confidence": 0,
                "error": "Could not analyze image with CLIP"
            }
    
    def clip_location_detection(image_base64):
        """
        Attempt to detect location type from image using CLIP.
        
        Args:
            image_base64 (str): Base64 encoded image
        
        Returns:
            dict: Location type detection results
        """
        API_URL = "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32"
        headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
        
        # Decode the base64 image
        image_data = base64.b64decode(image_base64)
        
        # Define location types
        locations = [
            "urban street", "residential neighborhood", "public park", 
            "highway", "business district", "school zone", "government building",
            "shopping center", "industrial area", "rural road"
        ]
        
        # Prepare data for location classification
        data = {
            "inputs": {
                "image": base64.b64encode(image_data).decode('utf-8'),
                "text": locations
            }
        }
        
        # Make API request
        response = requests.post(API_URL, headers=headers, json=data)
        return response.json()
        
    def submit_grievance_to_blockchain(grievance_data):
        """
        Submits grievance data to the blockchain using CDP AgentKit.
        
        Args:
            grievance_data (dict): Grievance details to submit
        
        Returns:
            dict: Transaction result
        """
        try:
            # Generate tracking ID if not provided
            if "trackingId" not in grievance_data or not grievance_data["trackingId"]:
                grievance_data["trackingId"] = f"GRV-{uuid.uuid4().hex[:8].upper()}"

            # Prepare transaction parameters
            contract_args = [
                grievance_data.get("title", "Untitled Grievance"),
                grievance_data.get("description", "No description provided"),
                grievance_data.get("category", "Unclassified"),
                grievance_data.get("location", "Unknown"),
                int(grievance_data.get("mediaCount", 1)),
                grievance_data.get("priorityLevel", "medium"),
                int(grievance_data.get("estimatedDays", 7)),
                int(grievance_data.get("fundAmount", 0)),
                grievance_data.get("currency", "ETH"),
                grievance_data.get("aiJustification", "Auto-generated from CLIP analysis"),
                grievance_data["trackingId"]
            ]

            # Build transaction payload
            transaction = {
                "to": GRIEVANCE_CONTRACT_ADDRESS,
                "data": wallet_provider.encode_contract_call(
                    GRIEVANCE_CONTRACT_ABI,
                    "submitGrievance",
                    contract_args
                ),
                "value": 0,  # No ETH sent with this transaction
                "gas": 300000,  # Adequate gas limit for the operation
                "gasPrice": wallet_provider.get_gas_price(),
                "nonce": wallet_provider.get_nonce(),
            }

            # Sign and send the transaction
            signed_tx = wallet_provider.sign_transaction(transaction)
            tx_hash = wallet_provider.send_raw_transaction(signed_tx.rawTransaction)

            # Return transaction hash and details
            return {
                "success": True,
                "transaction_hash": tx_hash.hex(),
                "tracking_id": grievance_data["trackingId"],
                "blockchain_address": GRIEVANCE_CONTRACT_ADDRESS,
                "explorer_link": f"https://base-sepolia.blockscout.com/tx/{tx_hash.hex()}"
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "details": "Failed to submit grievance to blockchain"
            }


    # Add this helper method to the EthAccountWalletProvider class
    def encode_contract_call(self, abi, function_name, args):
        """
        Encodes contract function call using web3.py
        
        Args:
            abi: Contract ABI
            function_name: Name of function to call
            args: List of arguments for the function
        
        Returns:
            Hex bytes of encoded function call
        """
        contract = self.web3.eth.contract(abi=abi)
        return contract.encodeABI(fn_name=function_name, args=args)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)