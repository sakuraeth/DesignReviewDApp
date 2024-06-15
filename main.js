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
        console.error('Upload design failed:', error.message);
    }
}

async function submitDesignReview(designIdentifier, reviewRating, reviewComment, userAccount) {
    try {
        const txResponse = await designReviewContract.methods.leaveReview(designIdentifier, reviewRating, reviewComment).send({ from: userAccount });
        console.log('Review submitted:', txResponse);
    } catch (error) {
        console.error('Submitting review failed:', error.message);
    }
}

async function getAndDisplayAllDesigns() {
    try {
        const designsTotal = await designReviewContract.methods.getDesignsCount().call();
        if (designsTotal === 0) {
            console.log("No designs found");
            return;
        }
        for (let i = 0; i < designsTotal; i++) {
            const designDetails = await designReviewContract.methods.getDesign(i).call();
            console.log(`Design ${i}:`, designDetails);
        }
    } catch (error) {
        console.error('Fetching designs failed:', error.message);
    }
}

async function retrieveCurrentUserAccount() {
    try {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    } catch (error) {
        console.error('Failed to retrieve account:', error.message);
        return null; // Return null if there's an issue retrieving accounts
    }
}

document.getElementById('uploadButton').addEventListener('click', async function() {
    const titleInput = document.getElementById('designTitle').value;
    const descriptionInput = document.getElementById('designDescription').value;
    const imageInput = document.getElementById('designImage').value; 
    const userAccount = await retrieveCurrentUserAccount();
    if(userAccount) {
        await uploadDesignToBlockchain(titleInput, descriptionInput, imageInput, userAccount);
    } else {
        console.error('No user account found.');
    }
});

document.getElementById('reviewButton').addEventListener('click', async function() {
    const designIdInput = document.getElementById('designId').value;
    const ratingInput = parseInt(document.getElementById('designRating').value, 10);
    const commentInput = document.getElementById('designComment').value;
    const userAccount = await retrieveCurrentUserAccount();
    if(userAccount) {
        await submitDesignReview(designIdInput, ratingInput, commentInput, userAccount);
    } else {
        console.error('No user account found.');
    }
});

getAndDisplayAllDesigns();