import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [reviewContent, setReviewContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL || 'your_default_api_url_here';

    try {
      const response = await axios.post(`${apiUrl}/path_to_submit_review`, {
        review: reviewContent,
      });

      console.log('Review submitted successfully:', response.data);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      <div>
        <label htmlFor="reviewContent">Review:</label>
        <textarea
          id="reviewContent"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewLayout;