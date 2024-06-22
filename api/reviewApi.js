import axios from 'axios';
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL;

const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submitReview`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review. ', parseAxiosError(error));
    throw new Error(parseAxiosError(error));
  }
};

const fetchReviewsForDesign = async (designId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/${designId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews for design. ', parseAxiosError(error));
    throw new Error(parseAxiosError(error));
  }
};

const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/updateReview/${reviewId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating review. ', parseAxiosError(error));
    throw new Error(parseAxiosError(error));
  }
};

const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteReview/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review. ', parseAxiosError(error));
    throw new Error(parseAxiosError(error));
  }
};

// Helper function to parse errors from Axios
function parseAxiosError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        return `Response error: ${status}, ${data}`;
    } else if (error.request) {
        // The request was made but no response was received
        return "No response received from the server";
    } else {
        // Something happened in setting up the request that triggered an Error
        return `Error setting up request: ${error.message}`;
    }
}

export { submitReview, fetchReviewsForDesign, updateReview, deleteReview };