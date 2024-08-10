import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // TODO: Fetch projects from backend API
    // Example fetchProjects function:
    // fetchProjects().then(data => setProjects(data));
    // This is placeholder logic, replace with actual API call
    setProjects([
      { id: 1, title: 'Project 1', description: 'Description for Project 1' },
      { id: 2, title: 'Project 2', description: 'Description for Project 2' },
      // Add more projects as needed
    ]);
  }, []);

  const handleEdit = (projectId) => {
    // TODO: Implement edit functionality
    console.log(`Editing project with id ${projectId}`);
  };

  const handleDelete = (projectId) => {
    // TODO: Implement delete functionality
    console.log(`Deleting project with id ${projectId}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project.id}>
            <td>{index + 1}</td>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(project.id)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(project.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectList;
