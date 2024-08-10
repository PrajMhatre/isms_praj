// src/api/teamLeaderApi.js

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

// Fetch all data for Team Leader
export const getTeamLeaderData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/team-leader/data`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching team leader data:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskid) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team-leader/tasks/${taskid}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
