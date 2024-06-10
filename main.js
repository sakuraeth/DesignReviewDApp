import Web3 from 'web3';
import DesignReviewDAppContract from './DesignReviewDCallABI.json'; 
const contractAddress = process.env.CONTRACT_ADDRESS;
const httpProvider = process.env.HTTP_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
const designReviewDApp = new web3.eth.Contract(DesignReviewDAppContract.abi, contractAddress);
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    console.error("Web3 is not found. Please install MetaMask or another web3 provider.");
}
async function uploadDesign(title, description, image, account) {
    try {
        const response = await designReviewDApp.methods.uploadDesign(title, description, image).send({ from: account });
        console.log('Design uploaded:', response);
    } catch (error) {
        console.error('Upload design failed:', error);
    }
}
async function leaveReview(designId, rating, comment, account) {
    try {
        const response = await designReviewDApp.methods.leaveReview(designId, rating, comment).send({ from: account });
        console.log('Review submitted:', response);
    } catch (error) {
        console.error('Leaving review failed:', error);
    }
}
async function fetchAndDisplayDesigns() {
    try {
        const designCount = await designReviewDApp.methods.getDesignsCount().call();
        for (let i = 0; i < designCount; i++) {
            const design = await designAdmin.methods.getDesign(i).call();
            console.log(`Design ${i}:`, design);
        }
    } catch (error) {
        console.error('Fetching designs failed:', error);
    }
}
async function getCurrentAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}
document.getElementById('uploadButton').addEventListener('click', async function() {
    const title = document.getElementById('designTitle').value;
    const description = document.getElementById('designDescription').value;
    const image = document.getElementById('designImage').value; 
    const account = await getCurrent.getAccounts();
    await uploadDesign(title, description, image, account);
});
document.getElementById('reviewButton').addEventListener('click', async function() {
    const designId = document.getElementById('designId').value;
    const rating = parseInt(document.getElementById('designRating').value, 10);
    const comment = document.getElementById('designComment').value;
    const account = await getCurrentAccount();
    await leaveReview(designId, rating, comment, account);
});
fetchAndDispatchDesigns();