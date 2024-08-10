// src/components/Auth/Logout.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Logout = ({ onLogout }) => {
  return (
    <Button variant="danger" onClick={onLogout}>
      Logout
    </Button>
  );
};

export default Logout;
