import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateProject = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    teamMembers: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to create project
    console.log('Creating project:', project);
    // Reset form state after submission
    setProject({ title: '', description: '', teamMembers: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter project title" name="title" value={project.title} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter project description" name="description" value={project.description} onChange={handleChange} required />
      </Form.Group>
      {/* Add team members input here */}
      <Button variant="primary" type="submit">
        Create Project
      </Button>
    </Form>
  );
};

export default CreateProject;
