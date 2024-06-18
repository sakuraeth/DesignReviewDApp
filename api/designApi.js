const Web3 = require('web3');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_ENDPOINT));

const contractABI = JSON.parse(process.env.CONTRACT_ABI);
const contractAddress = process.env.CONTRACT_ADDRESS;

const designContract = new web3.eth.Contract(contractABI, contractAddress);

async function uploadDesign(designData, fromAddress) {
  try {
    const uploadTx = await designContract.methods.uploadDesign(designData).send({ from: fromAddress });
    console.log("Design Uploaded Successfully. Transaction Hash:", uploadTx.transactionHash);
    return uploadTx;
  } catch (error) {
    console.error("Upload design failed:", error);
    throw error;  // This ensures the caller is aware an error occurred.
  }
}

async function fetchDesignList() {
  try {
    const designsList = await designContract.methods.getDesignsList().call();
    console.log("Fetched Design List Successfully.");
    return designsList;
  } catch (error) {
    console.error("Fetch design list failed:", error);
    throw error;  // Propagate error to inform the caller.
  }
}

async function fetchDesignDetails(designId) {
  try {
    const designDetails = await designContract.methods.getDesignDetails(designId).call();
    console.log("Fetched Design Details Successfully for ID:", designId);
    return designDetails;
  } catch (error) {
    console.error("Fetch design details failed:", error);
    throw error;  // Letting the caller know an exception occurred.
  }
}

const API_BASE_URL = process.env.API_BASE_URL;

async function uploadDesignToServer(designData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/design-upload`, designData);
    console.log("Design Uploaded to Server Successfully. Response ID:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Upload design to server failed:", error);
    throw error;  // Ensuring upstream code realizes the error.
  }
}

module.exports = {
  uploadDesign,
  fetchDesignList,
  fetchDesignDetails,
  uploadDesignToServer,
};