import React, { useState, useCallback } from 'react';
import axios from 'axios';

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const n = args[0];
    if (n in cache) {
      console.log('Fetching from cache for ', n);
      return cache[n];
    } else {
      console.log('Calculating result for ', n);
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

const expensiveFunction = (input) => {
  return input;
};

const memoizedExpensiveFunction = memoize(expensiveFunction);

const ReviewForm = () => {
  const [reviewContent, setReviewContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL || 'your_default_api_url_here';

    const processedReviewContent = memoizedExpensiveFunction(reviewContact);
    
    try {
      const response = await axios.post(`${apiUrl}/path_to_submit_review`, {
        review: processedReviewContent,
      });

      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReviewChange = useCallback((e) => {
    setReviewContent(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      <div>
        <label htmlFor="reviewContent">Review:</label>
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