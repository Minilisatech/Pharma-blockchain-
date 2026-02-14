# 🔗 Blockchain Supply Chain Transparency — Pharmaceutical

A full-stack prototype demonstrating blockchain-based traceability for the pharmaceutical supply chain, from manufacturer to consumer.

---

## 📁 Project Structure

```
pharma-blockchain/
├── frontend/
│   └── index.html          # Single-page UI (HTML/CSS/JS)
├── backend/
│   ├── server.js           # Node.js + Express REST API
│   └── package.json
├── contracts/
│   └── PharmaSupplyChain.sol  # Solidity smart contract
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Frontend

Simply open `frontend/index.html` in your browser. No build step required.

> The frontend expects the backend to be running at `http://localhost:3000`.

---

### 2. Backend

**Prerequisites:** Node.js, MongoDB running locally (or provide a `MONGO_URI` env var).

```bash
cd backend
npm install
npm start
```

The server starts on **port 3000** by default.

**API Endpoints:**

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/api/log`            | Record a blockchain log entry      |
| GET    | `/api/logs`           | Retrieve all log entries           |
| POST   | `/api/track`          | Update the supply chain tracker    |
| GET    | `/api/verify/:hash`   | Verify a drug by serial number     |

---

### 3. Smart Contract

**Prerequisites:** [Hardhat](https://hardhat.org/) or [Remix IDE](https://remix.ethereum.org/)

Deploy `contracts/PharmaSupplyChain.sol` to your chosen network (local, testnet, or mainnet).

```bash
# Example with Hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

**Contract functions:**

- `recordLog(batchId, actor, action)` — Write an immutable supply-chain event
- `getLog(index)` — Read a log entry by index
- `totalLogs()` — Get the total number of recorded events

---

## 🔒 Security & Compliance Notes

- Role-Based Access Control (RBAC) should be implemented before production
- Data encryption: AES-256 recommended for sensitive fields
- Authentication: OAuth2 / JWT
- Compliance: HIPAA, GDPR, FDA 21 CFR Part 11
- Smart contract audit required before mainnet deployment

---

## 📜 License

MIT
