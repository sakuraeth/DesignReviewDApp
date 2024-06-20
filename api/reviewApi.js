import axios from 'axios';
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL;

const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submitReview`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

const fetchReviewsForDesign = async (designId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/${designId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews for design:', error);
    throw error;
  }
};

const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axios.patch(`${API_BASE_QUOTES_API}/updateQuote/${reviewId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteReview/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

export { submitReview, fetchReviewsForDesign, updateReview, deleteReview };