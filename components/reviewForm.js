import React, { useState, useCallback } from 'react';
import axios from 'axios';

const createMemoizeFunction = () => {
  const cache = {};
  
  const fetchFromCache = (key) => {
    console.log('Fetching from cache for ', key);
    return cache[key];
  };

  const storeInCache = (key, result) => {
    console.log('Calculating and storing result for ', key);
    cache[key] = result;
    return result;
  };

  return (fn) => (...args) => {
    const key = args[0];
    return key in cache ? fetchFromCache(key) : storeInCache(key, fn(...args));
  };
};

const expensiveFunction = (input) => input;

const memoize = createMemoizeFunction();
const memoizedExpensiveFunction = memoize(expensiveFunction);

const ReviewForm = () => {
  const [reviewContent, setReviewContent] = useState('');

  const submitReview = async (processedContent) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'your_default_api_url_here';
    try {
      const response = await axios.post(`${apiUrl}/path_to_submit_review`, {
        review: processedContent,
      });

      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const processedReviewContent = memoizedExpensiveFunction(reviewContent);
    await submitReview(processedReviewContent);
  };

  const handleReviewChange = useCallback((event) => {
    setReviewContent(event.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      <div>
        <label htmlFor="reviewContent">Review:</labeą>;
        <textarea
          id="reviewContent"
          value={reviewContent}
          onChange={handleReviewChange}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;