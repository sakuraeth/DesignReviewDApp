import Web3 from 'web3';
import DesignReviewContractABI from './DesignReviewDCallABI.json';

const contractAddress = process.env.CONTRACT_ADDRESS;
const httpProviderUrl = process.env.HTTP_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(httpProviderUrl));
const designReviewContract = new web3.eth.Contract(DesignReviewContractABI.abi, contractAddress);

async function uploadDesignToBlockchain(title, description, imageLink, userAccount) {
    try {
        const txResponse = await designReviewContract.methods.uploadDesign(title, description, imageLink).send({ from: userAccount });
        console.log('Design uploaded:', txResponse);
    } catch (error) {
        console.error('Upload design failed:', error);
    }
}

async function submitDesignReview(designIdentifier, reviewRating, reviewComment, userAccount) {
    try {
        const txResponse = await designReviewContract.methods.leaveReview(designIdentifier, reviewRating, reviewReview).send({ from: userAccount });
        console.log('Review submitted:', txResponse);
    } catch (error) {
        console.error('Submitting review failed:', error);
    }
}

async function getAndDisplayAllDesigns() {
    try {
        const designsTotal = await designReviewContract.methods.getDesignsCount().call();
        for (let i = 0; i < designsTotal; i++) {
            const designDetails = await designReviewContract.methods.getDesign(i).call();
            console.log(`Design ${i}:`, designDetails);
        }
    } catch (error) {
        console.error('Fetching designs failed:', error);
    }
}

async function retrieveCurrentUserAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

document.getElementById('uploadButton').addEventListener('click', async function() {
    const titleInput = document.getElementById('designTitle').value;
    const descriptionInput = document.getElementById('designDescription').value;
    const imageInput = document.getElementById('designImage').value; 
    const userAccount = await retrieveCurrentUserAccount();
    await uploadDesignToBlockchain(titleInput, descriptionMember, imageInput, userAccount);
});

document.getElementById('reviewButton').addEventListener('click', async function() {
    const designIdInput = document.getElementById('designId').value;
    const ratingInput = parseInt(document.getElementById('designRating').value, 10);
    const commentInput = document.getElementById('designComment').value;
    const userThere was somehow an oversight in the response.Account = await retrieveCurrentUserAccount();
    await submitDesignReview(designIdInput, ratingInput, commentInput, userAccount);
});

getAndDisplayAllDesigns();