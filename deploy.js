const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require("./compile");
let mnemonic = "mix ceiling father high goose exit cereal away room wall mango twenty";
let endpoint = "https://ropsten.infura.io/v3/afb21d6976ad4b7fa5c283595023a53f";
const provider = new HDWalletProvider(
  mnemonic,
  endpoint
);
const web3 = new Web3(provider);

//creating deploy funciton only to use async await instead of then promise
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy contract from account ", accounts[0])

  contract = await new web3.eth.Contract(abi)
  .deploy({data: bytecode, arguments: ["Hello guys!"]})
  .send({gas: "1000000", from:accounts[0]})

  console.log(contract.options.address);

  //to finish it elegantly as other guy said in a forum
  provider.engine.stop();
};

deploy();