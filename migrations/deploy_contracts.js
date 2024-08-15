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
const deployContract = async () => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    const myContract = new web3.eth.Contract(contractABI);
    const gasEstimate = await myContract.deploy({ data: contractByteCode }).estimateGas();
    myContract.deploy({
        data: contractByteCode,
      })
      .send({
        from: account.address,
        gas: gasEstimate,
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('Contract deployed at address:', receipt.contractAddress);
      })
      .on('error', (error) => {
        console.error('Deployment Error:', error);
      });
  } catch (error) {
    console.error('Deployment failed:', error);
  }
};
deployContract();