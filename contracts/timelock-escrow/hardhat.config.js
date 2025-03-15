require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: process.env.BASE_RPC_URL,
      accounts: [process.env.BASE_PRIVATE_KEY],
    },
    reactive: {
      url: process.env.REACTIVE_RPC_URL,
      accounts: [process.env.REACTIVE_PRIVATE_KEY],
    },
  },
};