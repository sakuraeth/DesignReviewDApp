require('dotenv').config();
const Web3 = require('web3');
const { readFileSync } = require('fs');
const privateKey = process.env.PRIVATE_KEY;
const rpcURL = process.env.RPC_URL;
const contractABIPath = process.env.CONTRACT_ABI_PATH;
const contractByteCodePath = process.env.CONTRACT_BYTECODE_PATH;
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
const contractABI = JSON.parse(readFileSync(contractABIPath, 'utf-8'));
const contractByteCode = '0x' + readFileSync(contractByteCodePath, 'utf-8');
let deployedContractAddress;

const deployContract = async () => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    const myContract = new web3.eth.Contract(contractABI);
    const gasEstimate = await myContract.deploy({ data: contractByteCode }).estimateGas();
    myContract.deploy({
        data: contractByteCode
      })
      .send({
        from: account.address,
        gas: gasEstimate
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        deployedContractAddress = receipt.contractAddress;
        console.log('Contract deployed at address:', receipt.contractAddress);
      })
      .on('error', (error) => {
        console.error('Deployment Error:', error);
      });
  } catch (error) {
    console.error('Deployment failed:', error);
  }
};

const callContractFunction = async () => {
  if (!deployedContractAddress) {
    console.log("Contract not yet deployed or address not available.");
    return;
  }
  
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    const myContractInstance = new web3.eth.Contract(contractABI, deployedContractAddress);
    const result = await myContractInstance.methods.sampleFunction().call({
      from: account.address,
    });
    console.log('Function call result:', result);
  } catch (error) {
    console.error('Failed to call contract function:', error);
  }
};

deployContract();