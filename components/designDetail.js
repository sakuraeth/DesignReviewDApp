import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const DesignDetailsComponent = ({ designId }) => {
  const [designDetails, setDesignDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDesignDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/designs/${designId}`);
        setDesignDetails(response.data);
      } catch (error) {
        console.error('Error fetching design details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews?designId=${designId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchDesignDetails();
    fetchReviews();
  }, [designId]);

  return (
    <div>
      {designDetails ? (
        <div>
          <h2>{designDetails.title}</h2>
          <p>{designDetails.description}</p>
          <img src={designDetails.imageURL} alt={designDetails.title} />
          <div>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
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
        <p>Loading design details...</p>
      )}
    </div>
  );
};

export default DesignDetailsComponent;