import React from 'react';
import { Table } from 'react-bootstrap';

const TeamMembersReport = ({ reports }) => {
  return (
    <div>
      <h2>Team Members Report</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Member Name</th>
            <th>Task Count</th>
            <th>Completed Tasks</th>
            <th>Pending Tasks</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.memberName}</td>
              <td>{report.taskCount}</td>
              <td>{report.completedTasks}</td>
              <td>{report.pendingTasks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeamMembersReport;
