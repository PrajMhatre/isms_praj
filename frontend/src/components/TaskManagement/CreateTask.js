import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to create task
    console.log('Creating task:', task);
    // Reset form state after submission
    setTask({ title: '', description: '', assignedTo: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter task title" name="title" value={task.title} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter task description" name="description" value={task.description} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="assignedTo">
        <Form.Label>Assigned To</Form.Label>
        <Form.Control type="text" placeholder="Enter assigned person" name="assignedTo" value={task.assignedTo} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Task
      </Button>
    </Form>
  );
};

export default CreateTask;
