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
    return uploadTx;
  } catch (error) {
    console.error("Upload design failed:", error);
    throw error;
  }
}

async function fetchDesignList() {
  try {
    const designsList = await designContract.methods.getDesignsList().call();
    return designsList;
  } catch (error) {
    console.error("Fetch design list failed:", error);
    throw error;
  }
}

async function fetchDesignDetails(designId) {
  try {
    const designDetails = await designContract.methods.getDesignDetails(designId).call();
    return designDetails;
  } catch (error) {
    console.error("Fetch design details failed:", error);
    throw error;
  }
}

const API_BASE_URL = process.env.API_BASE_URL;

async function uploadDesignToServer(designData) {
  try {
    const response = await axios.post(`${API.DESIGN_UPLOAD_URL}`, designData);
    return response.data;
  } catch (error) {
    console.error("Upload design to server failed:", error);
    throw error;
  }
}

module.exports = {
  uploadDesign,
  fetchDesignList,
  fetchDesignDetails,
  uploadDesignToServer,
};