import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { Interface } from "ethers";
import * as readline from "readline";
import * as fs from "fs/promises";

// Contract Configuration
const CONTRACT_ADDRESS = "0xa64fEE7cED2C1AcE815aA35F705968eeC27fD620";
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string","name": "_title","type": "string"},
      {"internalType": "string","name": "_description","type": "string"},
      {"internalType": "string","name": "_category","type": "string"},
      {"internalType": "string","name": "_location","type": "string"},
      {"internalType": "uint256","name": "_mediaCount","type": "uint256"},
      {"internalType": "string","name": "_priorityLevel","type": "string"},
      {"internalType": "uint256","name": "_estimatedDays","type": "uint256"},
      {"internalType": "uint256","name": "_fundAmount","type": "uint256"},
      {"internalType": "string","name": "_currency","type": "string"},
      {"internalType": "string","name": "_aiJustification","type": "string"},
      {"internalType": "string","name": "_trackingId","type": "string"}
    ],
    "name": "submitGrievance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractInterface = new Interface(CONTRACT_ABI);

// Direct Prompt Configuration
const AGENT_PROMPT = `
You are an AI agent specializing in civic issue resolution and blockchain transactions. When analyzing grievances:

1. Carefully examine the title, description, and location
2. Classify priority as Low/Medium/High/Critical based on:
   - Safety implications
   - Number of affected people
   - Urgency of repair
3. Calculate estimated resolution time (1-30 days)
4. Determine fund allocation in USD (100-10,000)
5. Generate technical justification for decisions
6. ALWAYS create a tracking ID using format GRV-[timestamp]-[random5chars]

Final output must be valid JSON matching this schema:
{
  "title": "string",
  "description": "string", 
  "category": "string",
  "location": "string",
  "priorityLevel": "Low/Medium/High/Critical",
  "estimatedDays": number,
  "fundsUSD": number,
  "technicalJustification": "string",
  "trackingId": "string"
}`;

interface GrievanceAnalysis {
  mediaCount: number;
  title: string;
  description: string;
  category: string;
  location: string;
  priorityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedDays: number;
  fundsUSD: number;
  technicalJustification: string;
  trackingId: string;
}

class CivicAgent {
  private walletProvider!: CdpWalletProvider;
  private agentExecutor: any;

  constructor(
    private apiKeyName: string,
    private apiKeyPrivate: string,
    private networkId: string = "base-sepolia"
  ) {}

  async initialize() {
    let walletData: string | null = null;
    try {
      walletData = await fs.readFile("wallet.dat", "utf-8");
    } catch {} // Ignore missing file
    
    this.walletProvider = await CdpWalletProvider.configureWithWallet({
      apiKeyName: "2d419a73-7238-4d17-94f5-8954ef21306e",
      apiKeyPrivateKey: "iEh+c6uPETPFw2rMRn92Lvw6tgNofqGTvkpsoI+gm0DOhcXxscfJirGPKA3OzngljHH8x/NhPuWYbBS2VhU6vA==",
      networkId: this.networkId,
      cdpWalletData: walletData || undefined
    });

    const agentKit = await AgentKit.from({
      walletProvider: this.walletProvider,
      actionProviders: []
    });

    const tools = await getLangChainTools(agentKit);
    const llm = new ChatOpenAI({ model: "gpt-4o", temperature: 0.2 });

    this.agentExecutor = createReactAgent({
      llm,
      tools,
      checkpointSaver: new MemorySaver(),
      messageModifier: AGENT_PROMPT
    });

    await this.persistWallet();
  }

  private async persistWallet() {
    const exportedWalletData = await this.walletProvider.exportWallet();
    await fs.writeFile("wallet.dat", JSON.stringify(exportedWalletData));
  }

  private parseAnalysisResponse(response: string): GrievanceAnalysis {
    try {
      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}");
      const jsonString = response.slice(jsonStart, jsonEnd + 1);
      const analysis = JSON.parse(jsonString);
      
      if (!analysis.trackingId) {
        analysis.trackingId = this.generateTrackingId();
      }
      
      return analysis as GrievanceAnalysis;
    } catch (error) {
      throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private generateTrackingId(): string {
    return `GRV-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`.toUpperCase();
  }

  private async submitToBlockchain(analysis: GrievanceAnalysis): Promise<string> {
    try {
      const encodedData = contractInterface.encodeFunctionData("submitGrievance", [
        analysis.title,
        analysis.description,
        analysis.category,
        analysis.location,
        analysis.mediaCount || 0,
        analysis.priorityLevel,
        analysis.estimatedDays,
        analysis.fundsUSD,
        "USD",
        analysis.technicalJustification,
        analysis.trackingId
      ]);

      return await this.walletProvider.sendTransaction({
        to: CONTRACT_ADDRESS,
        data: encodedData as `0x${string}`,
        value: BigInt(0),
        gas: BigInt(500000)
      });
    } catch (error) {
      throw new Error(`Blockchain submission failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async processGrievance(prompt: string) {
    try {
      const stream = await this.agentExecutor.stream(
        { messages: [new HumanMessage(prompt)] },
        { configurable: { thread_id: "civic-agent-1" } }
      );

      let finalResponse = "";
      for await (const chunk of stream) {
        finalResponse += chunk.agent?.messages?.[0]?.content || "";
        finalResponse += chunk.tools?.messages?.[0]?.content || "";
      }

      const analysis = this.parseAnalysisResponse(finalResponse);
      const txHash = await this.submitToBlockchain(analysis);

      return {
        analysis,
        txHash,
        trackingId: analysis.trackingId
      };
    } catch (error) {
      throw new Error(`Processing failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

// Execution
(async () => {
  const agent = new CivicAgent(
    process.env.CDP_API_KEY_NAME!,
    process.env.CDP_API_KEY_PRIVATE!
  );

  await agent.initialize();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  while (true) {
    const prompt = await new Promise<string>(resolve => 
      rl.question("\nDescribe the civic issue (type 'exit' to quit): ", resolve)
    );

    if (prompt.toLowerCase() === "exit") break;

    try {
      const result = await agent.processGrievance(prompt);
      console.log(`
      Analysis Complete!
      Tracking ID: ${result.trackingId}
      Transaction Hash: ${result.txHash}
      Estimated Resolution: ${result.analysis.estimatedDays} days
      Fund Allocation: $${result.analysis.fundsUSD}
      `);
    } catch (error) {
      console.error("\x1b[31mError:", error instanceof Error ? error.message : "Unknown error", "\x1b[0m");
    }
  }

  rl.close();
})();