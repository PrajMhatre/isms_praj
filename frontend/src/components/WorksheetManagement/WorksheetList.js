import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const WorksheetList = () => {
  const [worksheets, setWorksheets] = useState([]);

  useEffect(() => {
    // TODO: Fetch worksheets from backend API
    // Example fetchWorksheets function:
    // fetchWorksheets().then(data => setWorksheets(data));
    // This is placeholder logic, replace with actual API call
    setWorksheets([
      { id: 1, title: 'Worksheet 1', description: 'Description for Worksheet 1', status: 'Pending' },
      { id: 2, title: 'Worksheet 2', description: 'Description for Worksheet 2', status: 'Approved' },
      // Add more worksheets as needed
    ]);
  }, []);

  const handleEdit = (worksheetId) => {
    // TODO: Implement edit functionality
    console.log(`Editing worksheet with id ${worksheetId}`);
  };

  const handleDelete = (worksheetId) => {
    // TODO: Implement delete functionality
    console.log(`Deleting worksheet with id ${worksheetId}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {worksheets.map((worksheet, index) => (
          <tr key={worksheet.id}>
            <td>{index + 1}</td>
            <td>{worksheet.title}</td>
            <td>{worksheet.description}</td>
            <td>{worksheet.status}</td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(worksheet.id)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(worksheet.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default WorksheetList;
