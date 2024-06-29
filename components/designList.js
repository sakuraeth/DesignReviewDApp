import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignList = () => {
  const [designsList, setDesigns;List] = useState([]);
  const [selectedDesignDetails, setSelectedDesignDetails] = useState(null);

  const fetchDesignList = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/designs`);
      setDesignsList(response.data);
    } catch (error) {
      console.error('Error fetching design list:', error);
    }
  };

  useEffect(() => {
    fetchDesignList();
  }, []);

  const handleDesignSelection = (designId) => {
    const selectedDesign = designsList.find(design => design.id === designId);
    setSelectedDesignDetails(selectedDesign);
  };

  const renderDesignItems = () => {
    if (designsList.length === 0) {
      return <div>Loading...</div>;
    }

    return designsList.map((designItem) => (
      <div key={designItem.id} onClick={() => handleDesignSelection(designItem.id)} style={{ cursor: 'pointer', padding: 10, border: '1px solid #ccc' }}>
        <h3>{designItem.title}</h3>
        <p>{designItem.description}</p>
      </div>
    ));
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

export default DesignList;