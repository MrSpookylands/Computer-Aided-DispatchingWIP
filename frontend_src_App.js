import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import IncidentReport from './components/IncidentReport';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/incidents')
        .then(response => setUser(response.data.user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard">
          {user ? <Dashboard user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/report-incident">
          {user ? <IncidentReport /> : <Redirect to="/login" />}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;