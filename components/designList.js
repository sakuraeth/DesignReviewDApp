import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignList = () => {
  const [designsList, setDesignsList] = useState([]);
  const [selectedDesignDetails, setSelectedDesignDetails] = useState(null);
  const [error, setError] = useState(null); // New state to keep track of errors

  const fetchDesignList = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/designs`);
      setDesignsList(response.data);
    } catch (error) {
      console.error('Error fetching design list:', error);
      setError("Failed to load the design list. Please try again later."); // Setting an error message on failure
    }
  };

  useEffect(() => {
    fetchDesignList();
  }, []);

  const handleDesignSelection = (designId) => {
    try {
      const selectedDesign = designsList.find(design => design.id === designId);
      setSelectedDesignDetails(selectedDesign);
    } catch (error) {
      console.error('Error selecting design:', error);
      setError("Failed to select the design. Please try again."); // Handling potential error during design selection
    }
  };

  const renderDesignItems = () => {
    if (error) {
      return <div>Error: {error}</div>; // Displaying error message if any
    }

    if (designsList.length === 0) {
      return <div>Loading...</div>;
    }

    return (designsList.map((designItem) => (
      <div key={designItem.id} onClick={() => handleDesignSelection(designItem.id)} style={{ cursor: 'pointer', padding: 10, border: '1px solid #ccc' }}>
        <h3>{designItem.title}</h3>
        <p>{designItem.description}</p>
      </div>
    )));
  };

  return (
    <div>
      <div>
        <h2>Designs List</h2>
        <div>{renderDesignItems()}</div>
      </div>
      {selectedDesignDetails && (
        <div>
          <h2>Selected Design Details</h2>
          <div>
            <h3>{selectedDesignDetails.title}</h3>
            <p>{selectedDesignDetails.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Design