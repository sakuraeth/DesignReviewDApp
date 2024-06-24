import axios from 'axios';
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const processRequest = async (method, path, data = null) => {
    try {
        const config = {
            method,
            url: path,
            ...(method !== 'get' && { data }),
        };
        const response = await axiosIstance(config);
        return response.data;
    } catch (error) {
        console.error('Request error: ', parseAxiosError(error));
        throw new Error(parseAxiosError(error));
    }
};

const submitReview = (reviewData) => processRequest('post', `/submitReview`, reviewData);
const fetchReviewsForDesign = (designId) => processRequest('get', `/reviews/${designId}`);
const updateReview = (reviewId, updatedData) => processRequest('patch', `/updateReview/${reviewId}`, updatedData);
const deleteReview = (reviewId) => processRequest('delete', `/deleteReview/${reviewId}`);

function parseAxiosError(error) {
    let errorResponse = "Unexpected error occurred";
    if (error.response) {
        const { status, data } = error.response;
        errorResponse = `Response error: ${status}, ${data}`;
    } else if (error.request) {
        errorResponse = "No response received from the server";
    } else {
        errorResponse = `Error setting up request: ${error.message}`;
    }
    error = null;
    return errorResponse;
}

export { submitReview, fetchReviewsForDesign, updateReview, deleteReview };