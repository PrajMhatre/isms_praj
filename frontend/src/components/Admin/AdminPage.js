import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import './AdminPage.css';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/userApi'; // Import API functions

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userid: '',
    username: '',
    employeeName: '',
    emailId: '',
    phone: '',
    password: '',
    userType: ''
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers(); // Fetch users from API
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setFormData({
      userid: '',
      username: '',
      employeeName: '',
      emailId: '',
      phone: '',
      password: '',
      userType: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const userData = {
        username: formData.username,
        employee_name: formData.employeeName,
        email_id: formData.emailId,
        phone: formData.phone,
        password: formData.password,
        usertype: formData.userType
      };

      if (isEditing) {
        await updateUser(formData.userid, userData); // Send update request to API
      } else {
        await createUser(userData); // Send new user data to API
      }

      fetchUsers(); // Refresh user list after adding or updating user
      toggleForm();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} user:`, error);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setShowForm(true);
    setFormData({
      userid: user.userid,
      username: user.username,
      employeeName: user.employee_name,
      emailId: user.email_id,
      phone: user.phone,
      password: user.password,
      userType: user.usertype
    });
  };

  const handleDelete = async (userid) => {
    try {
      await deleteUser(userid); // Send delete request to API
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Employee Details</h1>
      
      {/* Add New User button */}
      <Button variant="primary" onClick={toggleForm} className="add-user-button">
        {isEditing ? 'Cancel Edit' : 'Add New Employee'}
      </Button>

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Form section */}
      {showForm && (
        <div className="form-section">
          <div className="form-header">
            <h3>{isEditing ? 'Edit User' : 'Add New User'}</h3>
            <span className="close-button" onClick={toggleForm}>
              &times;
            </span>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group controlId="formEmployeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="IT_HOD">IT HOD</option>
                <option value="Task_Manager">Task Manager</option>
                <option value="Team_Member">Team Member</option>
                <option value="Team_Leader">Team Leader</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditing ? 'Update User' : 'Add New User'}
            </Button>
          </Form>
        </div>
      )}

      {/* Table section */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>User ID</th>
            <th>Employee Name</th>
            <th>Email Id</th>
            <th>Phone No.</th>
            <th>Password</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.username}</td>
              <td>{user.userid}</td>
              <td>{user.employee_name}</td>
              <td>{user.email_id}</td>
              <td>{user.phone}</td>
              <td>{user.password}</td>
              <td>{user.usertype}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.userid)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
