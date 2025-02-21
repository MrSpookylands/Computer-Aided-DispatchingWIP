import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get('/api/incidents')
      .then(response => setIncidents(response.data))
      .catch(error => console.error('Error fetching incidents:', error));
  }, []);

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <h3>Reported Incidents</h3>
      <ul>
        {incidents.map(incident => (
          <li key={incident._id}>
            <strong>{incident.type}</strong> at {incident.location} - {incident.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;