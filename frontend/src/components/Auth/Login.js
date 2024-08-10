// src/components/Auth/Login.js

import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('IT_HOD'); // Default to IT_HOD

  const handleLogin = () => {
    // Pass username, password, and userType to the onLogin function
    onLogin(username, password, userType);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formUserType">
          <Form.Label>User Type</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {userType}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setUserType('IT_HOD')}>IT_HOD</Dropdown.Item>
              <Dropdown.Item onClick={() => setUserType('Task_Manager')}>Task_Manager</Dropdown.Item>
              <Dropdown.Item onClick={() => setUserType('Team_Member')}>Team_Member</Dropdown.Item>
              <Dropdown.Item onClick={() => setUserType('Team_Leader')}>Team_Leader</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
