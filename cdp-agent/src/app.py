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

# Initialize global agent and wallet provider
agent = None
wallet_provider = None

# Configure a file to persist the agent's CDP API Wallet Data.
wallet_data_file = "wallet_data.txt"

# Ensure necessary environment variables are set
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
assert HUGGINGFACE_API_KEY, "You must set the HUGGINGFACE_API_KEY environment variable"

PRIVATE_KEY = os.getenv("PRIVATE_KEY")
assert PRIVATE_KEY, "You must set the PRIVATE_KEY environment variable"
assert PRIVATE_KEY.startswith("0x"), "Private key must start with 0x hex prefix"

GRIEVANCE_CONTRACT_ADDRESS = os.getenv("GRIEVANCE_CONTRACT_ADDRESS")
assert GRIEVANCE_CONTRACT_ADDRESS, "You must set the GRIEVANCE_CONTRACT_ADDRESS environment variable"

GRIEVANCE_CONTRACT_ABI = [...]  # Keep the same ABI as in your original code

# Custom helper functions
def clip_grievance_categorize(image_base64):
    API_URL = "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32"
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
    
    image_data = base64.b64decode(image_base64)
    categories = [
        "road pothole", "broken street light", "graffiti vandalism", 
        "fallen tree", "water leak", "garbage dumping", "broken sidewalk", 
        "missing street sign", "flooding", "damaged public property"
    ]
    
    data = {
        "inputs": {
            "image": base64.b64encode(image_data).decode('utf-8'),
            "text": categories
        }
    }
    
    response = requests.post(API_URL, headers=headers, json=data)
    clip_results = response.json()
    
    if isinstance(clip_results, list) and len(clip_results) > 0:
        highest_score = 0
        category = "unclassified"
        
        for item in clip_results:
            if item["score"] > highest_score:
                highest_score = item["score"]
                category = item["label"]
        
        high_priority = ["water leak", "flooding", "fallen tree", "broken street light"]
        medium_priority = ["road pothole", "damaged public property", "missing street sign"]
        low_priority = ["graffiti vandalism", "garbage dumping", "broken sidewalk"]
        
        if category in high_priority:
            priority, days = "high", 3
        elif category in medium_priority:
            priority, days = "medium", 7
        else:
            priority, days = "low", 14
            
        return {
            "category": category,
            "priorityLevel": priority,
            "estimatedDays": days,
            "confidence": highest_score,
            "all_results": clip_results
        }
    else:
        return {
            "category": "unclassified",
            "priorityLevel": "medium",
            "estimatedDays": 7,
            "confidence": 0,
            "error": "CLIP analysis failed"
        }

def submit_grievance_to_blockchain(grievance_data):
    try:
        if "trackingId" not in grievance_data:
            grievance_data["trackingId"] = f"GRV-{uuid.uuid4().hex[:8].upper()}"

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

        transaction = {
            "to": GRIEVANCE_CONTRACT_ADDRESS,
            "data": wallet_provider.encode_contract_call(
                GRIEVANCE_CONTRACT_ABI,
                "submitGrievance",
                contract_args
            ),
            "value": 0,
            "gas": 300000,
            "gasPrice": wallet_provider.get_gas_price(),
            "nonce": wallet_provider.get_nonce(),
        }

        signed_tx = wallet_provider.sign_transaction(transaction)
        tx_hash = wallet_provider.send_raw_transaction(signed_tx.rawTransaction)

        return {
            "success": True,
            "transaction_hash": tx_hash.hex(),
            "tracking_id": grievance_data["trackingId"],
            "explorer_link": f"https://base-sepolia.blockscout.com/tx/{tx_hash.hex()}"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Flask routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit_grievance", methods=["POST"])
def submit_grievance():
    try:
        title = request.form.get("title", "Untitled Grievance")
        description = request.form.get("description", "No description provided")
        location = request.form.get("location", "Unknown")
        image_file = request.files.get("image")
        
        if not image_file:
            return jsonify({"success": False, "error": "No image provided"}), 400
        
        image_data = image_file.read()
        image_base64 = base64.b64encode(image_data).decode("utf-8")
        
        clip_results = clip_grievance_categorize(image_base64)
        
        grievance_data = {
            "title": title,
            "description": description,
            "location": location,
            "category": clip_results.get("category", "Unclassified"),
            "priorityLevel": clip_results.get("priorityLevel", "medium"),
            "estimatedDays": clip_results.get("estimatedDays", 7),
            "mediaCount": 1,
            "aiJustification": json.dumps(clip_results.get("all_results", [])),
        }
        
        blockchain_result = submit_grievance_to_blockchain(grievance_data)
        if not blockchain_result.get("success"):
            return jsonify(blockchain_result), 500
            
        return jsonify({
            "success": True,
            "grievance": grievance_data,
            "blockchain": blockchain_result
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/get_grievance/<tracking_id>", methods=["GET"])
def get_grievance(tracking_id):
    try:
        contract_args = [tracking_id]
        result = wallet_provider.call_contract(
            GRIEVANCE_CONTRACT_ADDRESS,
            GRIEVANCE_CONTRACT_ABI,
            "getGrievance",
            contract_args
        )
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/get_all_grievances", methods=["GET"])
def get_all_grievances():
    try:
        result = wallet_provider.call_contract(
            GRIEVANCE_CONTRACT_ADDRESS,
            GRIEVANCE_CONTRACT_ABI,
            "getAllGrievances",
            []
        )
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/mark_resolved/<tracking_id>", methods=["POST"])
def mark_resolved(tracking_id):
    try:
        contract_args = [tracking_id]
        transaction = {
            "to": GRIEVANCE_CONTRACT_ADDRESS,
            "data": wallet_provider.encode_contract_call(
                GRIEVANCE_CONTRACT_ABI,
                "markResolved",
                contract_args
            ),
            "value": 0,
            "gas": 200000,
            "gasPrice": wallet_provider.get_gas_price(),
            "nonce": wallet_provider.get_nonce(),
        }

        signed_tx = wallet_provider.sign_transaction(transaction)
        tx_hash = wallet_provider.send_raw_transaction(signed_tx.rawTransaction)
        
        return jsonify({
            "success": True,
            "transaction_hash": tx_hash.hex(),
            "explorer_link": f"https://base-sepolia.blockscout.com/tx/{tx_hash.hex()}"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

def initialize_agent():
    global agent, wallet_provider
    account = Account.from_key(PRIVATE_KEY)
    wallet_provider = EthAccountWalletProvider(
        config=EthAccountWalletProviderConfig(account=account, chain_id="84532")
    )
    
    # Monkey-patch encode_contract_call method
    def encode_contract_call(self, abi, function_name, args):
        contract = self.web3.eth.contract(abi=abi)
        return contract.encodeABI(fn_name=function_name, args=args)
    
    EthAccountWalletProvider.encode_contract_call = encode_contract_call
    
    agent = AgentKit(
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

if __name__ == "__main__":
    initialize_agent()
    app.run(host="0.0.0.0", port=5000, debug=True)