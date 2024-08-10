import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditProject = ({ projectId }) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    teamMembers: [],
  });

  useEffect(() => {
    // TODO: Fetch project details using projectId and populate form
    // Example fetchProject function:
    // fetchProject(projectId).then(data => setProject(data));
    // This is placeholder logic, replace with actual API call
    setProject({
      title: `Project ${projectId}`,
      description: `Description for Project ${projectId}`,
      teamMembers: [`Member 1`, `Member 2`],
    });
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update project
    console.log('Updating project:', project);
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
        Update Project
      </Button>
    </Form>
  );
};

export default EditProject;
