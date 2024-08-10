import React from 'react';
import { Table } from 'react-bootstrap';

const TaskHistory = ({ history }) => {
  return (
    <div>
      <h2>Task History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Completed Date</th>
          </tr>
        </thead>
        <tbody>
          {history && history.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.completedDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskHistory;
