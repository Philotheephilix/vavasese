const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Load environment variables
  const uniswapV2PairAddr = process.env.UNISWAP_V2_PAIR_ADDR;
  const callbackAddr = process.env.CALLBACK_ADDR;
  const clientWallet = process.env.CLIENT_WALLET;
  const directionBoolean = process.env.DIRECTION_BOOLEAN === "true";
  const exchangeRateDenominator = parseInt(process.env.EXCHANGE_RATE_DENOMINATOR);
  const exchangeRateNumerator = parseInt(process.env.EXCHANGE_RATE_NUMERATOR);

  // Deploy the contract
  const ReactiveContract = await hre.ethers.getContractFactory("UniswapDemoStopOrderReactive");
  const reactive = await ReactiveContract.deploy(
    uniswapV2PairAddr,
    callbackAddr,
    clientWallet,
    directionBoolean,
    exchangeRateDenominator,
    exchangeRateNumerator,
    { value: hre.ethers.parseEther("0.01") }
  );

  await reactive.waitForDeployment();

  console.log("Reactive contract deployed to:", await reactive.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });