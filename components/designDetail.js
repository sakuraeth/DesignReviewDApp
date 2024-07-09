import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const DesignDetailsComponent = ({ designId }) => {
  const [designDetails, setDesignDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  // Adding state for loading and error states
  const [isFetchingDesign, setIsFetchingDesign] = useState(false);
  const [designError, setDesignError] = useState(null);
  const [isFetchingReviews, setIsFetchingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    const fetchDesignDetails = async () => {
      setIsFetchingDesign(true); // Start fetching design details
      try {
        const response = await axios.get(`${API_URL}/designs/${designId}`);
        setDesignDetails(response.data);
        setDesignError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching design details:', error);
        setDesignError('Failed to fetch design details'); // Set error message
      } finally {
        setIsFetchingDesign(false); // Finished fetching
      }
    };

    const fetchReviews = async () => {
      setIsFetchingReviews(true); // Start fetching reviews
      try {
        const response = await axios.get(`${API_URL}/reviews?designId=${designId}`);
        setReviews(response.data);
        setReviewsError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviewsError('Failed to fetch reviews'); // Set error message
      } finally {
        setIsFetchingReviews(false); // Finished fetching
      }
    };

    fetchDesignDetails();
    fetchReviews();
  }, [designId]);

  return (
    <div>
      {isFetchingDesign ? (
        <p>Loading design details...</p>
      ) : designError ? (
        <p>Error: {designError}</p>
      ) : designDetails ? (
        <div>
          <h2>{designDetails.title}</h2>
          <p>{designDetails.description}</p>
          <img src={designDetails.imageURL} alt={designDetails.title} />
          <div>
            <h3>Reviews</h3>
            {isFetchingReviews ? (
              <p>Loading reviews...</p>
            ) : reviewsError ? (
              <p>Error: {reviewsError}</p>
            ) : reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id}>
                  <h4>{review.author}</h4>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        </div>
      ) : (
        <p>Design details unavailable.</p>
      )}
    </div>
  );
};

export default DesignDetailsComponent;