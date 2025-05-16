
---

# Milestone: Decentralized Civic Issue Resolution Platform

[![Demo Video](https://img.shields.io/badge/Demo-Video-blue)](https://youtu.be/wxGTL2fb3Rs)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://vavasese.vercel.app/)
[![Smart Contracts](https://img.shields.io/badge/Smart_Contracts-Basescan-orange)](https://base-sepolia.blockscout.com/address/0xf88C501cBA1DB713c080F886c74DB87ffd616FB2?tab=index)
[![Smart Contracts](https://img.shields.io/badge/Smart_Contracts-Basescan-orange)](https://base-sepolia.blockscout.com/address/0x4772dd21E368038682327fCa01E75f71666689cD?tab=index)
---

## 🌟 Problem Statement

Citizens frequently face unresolved civic issues like potholes, road bumps, broken streetlights, and more due to:

* **Bureaucratic Delays**: Manual reporting systems cause lag
* **Lack of Accountability**: No clear audit trail for tasks
* **Privacy Concerns**: Citizens hesitate to report issues due to identity exposure
* **Payment Inefficiencies**: Delayed contractor payments
* **Complex Technology**: Barriers to blockchain adoption

---

## 🚀 Solution Overview

**Milestone** offers a streamlined, AI-powered civic reporting platform backed by decentralized infrastructure. Citizens can report issues with evidence (photos/videos), which are:

1. **Reviewed by AI** for categorization and validation
2. **Opened for contractor bidding** with reputation metrics
3. **Matched with the best bid**, AI-approved
4. **Paid via smart escrow** upon verified completion


## 🔑 Key Features

* **ZK Identity Verification**: Private authentication using Self Protocol
* **AI-Powered Categorization**: NLP + image recognition to classify reports
* **Contractor Bidding**: Reputation-based task assignment
* **Smart Escrow Payments**: Held until AI-verified completion
* **Quadratic Voting DAO**: Community-powered dispute resolution
* **Gasless UX**: Coinbase Smart Wallets for seamless interactions

---

## 📋 Core Components

| Component       | Technology Stack          | Description                                      |
| --------------- | ------------------------- | ------------------------------------------------ |
| Frontend        | Next.js, Shadcn/ui        | Responsive citizen dashboard and reporting UI    |
| Smart Contracts | Solidity, Foundry         | Handles bidding, escrow, penalties, verification |
| AI Layer        | AgentKit, TensorFlow      | NLP + vision models for issue validation         |
| Identity        | Self.xyz                  | ZK-proof identity for citizens                   |
| Payments        | Reactive Network, Sablier | Escrow + streamed contractor payments            |

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Philotheephilix/vavasese.git

# Install frontend dependencies
cd milestone
npm install

# Create environment config
cp .env.example .env.local

# Start the frontend server
npm run dev

# Start AI agent server
cd cdp-agent
pip install -r requirements.txt
python3 src/app.py
```

---

## 📜 Smart Contract Deployment

```bash
# Navigate to contracts
cd contracts/timelock-escrow

# Install dependencies
npm install

# Deploy using Foundry
forge script script/Deploy.s.sol --broadcast --verify -vvvv
```

---

## 🌐 Key Integrations

* **Blockchain**: Base Network, Reactive Network
* **Identity**: Self Protocol with ZK Proofs
* **AI/ML**: TensorFlow, Hugging Face for analysis
* **Payments**: Sablier Streaming & Reactive Escrow
* **Governance**: DAO with Quadratic Voting

---

## 📈 Workflow Overview

1. **Report Submission**

   * Citizen logs in with ZK identity
   * Submits report with photo/video evidence
   * AI verifies issue type and validity

2. **Contractor Bidding**

   * Verified contractors place bids
   * AI selects best based on cost & reputation
   * Funds locked in escrow

3. **Work Execution**

   * Contractor completes the task
   * AI and/or citizen validate outcome
   * Smart contract releases payment

4. **DAO Governance**

   * Dispute resolution via quadratic voting
   * Upgrades, rules, and fund distribution

---

## 📂 Project Structure

```
milestone/
├── app/              # Next.js app
├── contracts/        # Solidity contracts
├── cdp-agent/        # AI agent logic
├── components/       # Reusable UI
├── lib/              # Shared JS utilities
├── public/           # Static assets (images, etc.)
└── styles/           # Global CSS
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/your-feature-name`
5. Open a pull request

---

## 📄 License

MIT License — see `LICENSE` for details.

---

## 📧 Contact

Project Lead — [philosanjay5@gmail.com](mailto:philosanjay5@gmail.com)

---

**Milestone** — *Empowering Communities, One Fix at a Time*

> Rebuilding civic infrastructure through trust, transparency, and technology.

---

Let me know if you want this converted into a downloadable `README.md` or need visuals like updated architecture diagrams or logo!
