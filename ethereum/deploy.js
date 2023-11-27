const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledRecord = require("./build/Record.json");

//Link to goerli network by using Infura and providing seed phrase of metamask wallet
const provider = new HDWalletProvider(
  "hurdle make pen grab domain barrel soul employ bunker build thought lonely",
  "https://sepolia.infura.io/v3/e5d82d55519343f59b07da5e9293a3f7"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  //Deploy contract to sepolia network
  const result = await new web3.eth.Contract(
    JSON.parse(compiledRecord.interface)
  )
    .deploy({ data: compiledRecord.bytecode })
    .send({ gas: "10000000", from: accounts[0] });

  //Display the address of the contract
  console.log("Contract deployed to", result.options.address);

  //Always go to record.js after updating solidity code
};

deploy();
