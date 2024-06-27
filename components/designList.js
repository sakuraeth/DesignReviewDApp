import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignList = () => {
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const fetchDesigns = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/designs`);
      setDesigns(response.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleDesignSelect = (designId) => {
    const selected = designs.find(design => design.id === designId);
    setSelectedDesign(selected);
  };

  const renderDesigns = () => {
    if (designs.length === 0) {
      return <div>Loading...</div>;
    }

    return designs.map((design) => (
      <div key={design.id} onClick={() => handleDesignSelect(design.id)} style={{ cursor: 'pointer', padding: 10, border: '1px solid #ccc' }}>
        <h3>{design.title}</h3>
        <p>{design.description}</p>
      </div>
    ));
  };

  return (
    <div>
      <div>
        <h2>Designs</h2>
        <div>{renderDesigns()}</div>
      </div>
      {selectedDesign && (
        <div>
          <h2>Selected Design</h2>
          <div>
            <h3>{selectedDesign.title}</h3>
            <p>{selectedDesign.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignList;