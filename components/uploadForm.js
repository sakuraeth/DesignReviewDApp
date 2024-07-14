import React, { useState } from 'react';
import axios from 'axios';

const DesignUploadForm = () => {
  const [designTitle, setDesignTitle] = useState('');
  const [designDescription, setDesignDescription] = useState('');
  const [designFile, setDesignFile] = useState(null);
  const [error, setError] = useState('');

  const handleTitleChange = (e) => setDesignTitle(e.target.value);
  const handleDescriptionChange = (e) => setDesignDescription(e.target.value);
  const handleFileChange = (e) => setDesignFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', designTitle);
    formData.append('description', designDescription);
    formData.append('designFile', designFile);

    try {
      const uploadEndpoint = process.env.REACT_APP_UPLOAD_ENDPOINT;

      const response = await axios.post(uploadReference, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Design submission response:', response.data);
    
      setDesignTitle('');
      setDesignDescription('');
      setDesignFile(null);
    } catch (error) {
      console.error('Error submitting design:', error);
      setError('Failed to submit design. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Design Title:</a>
        <input
          type="text"
          id="title"
          value={designTitle}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={designDescription}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <div>
        <label htmlFor="designFile">Design File:</label>
        <input
          type="file"
          id="designFile"
          onChange={handleFileChange}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Submit Design</button>
    </form>
  );
}

export default DesignUploadForm;