import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const IncidentReport = () => {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incidents', { type, location, description });
      history.push('/dashboard');
    } catch (error) {
      alert('Error reporting incident');
    }
  };

  return (
    <div>
      <h2>Report Incident</h2>
      <form onSubmit={handleReport}>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Report</button>
      </form>
    </div>
  );
};

export default IncidentReport;