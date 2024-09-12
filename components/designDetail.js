import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const DesignDetailsComponent = ({ designId }) => {
  const [designData, setDesignData] = useState({ details: null, reviews: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start fetching
      try {
        // Assuming the API endpoint now returns both design details and reviews in a single call
        const response = await axios.get(`${API_URL}/designDetailsAndReviews/${designId}`);
        setDesignData({
          details: response.data.designDetails,
          reviews: response.data.reviews,
        });
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data'); // Set error message
      } finally {
        setIsLoading(false); // Finished fetching
      }
    };

    fetchData();
  }, [designId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {designData.details && (
            <div>
              <h2>{designData.details.title}</h2>
              <p>{designData.details.description}</p>
              <img src={designData.details.imageURL} alt={designData.details.title} />
            </div>
          )}
          <div>
            <h3>Reviews</h3>
            {designData.reviews.length > 0 ? (
              designData.reviews.map(review => (
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
      )}
    </div>
  );
};

export default DesignDetailsComponent;