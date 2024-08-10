// src/components/Auth/AdminLogin.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Pass username and password to the onLogin function for admin login
    onLogin(username, password, 'admin'); // 'admin' as user type for admin login
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <Form>
        <Form.Group controlId="formAdminUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAdminPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Admin Login
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
