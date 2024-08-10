// src/api/ithodApi.js

const BASE_URL = 'http://localhost:3000/ithod'; // Adjust with your backend URL

export const getITHODData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ithod-data`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching IT HOD data:', error);
    throw error;
  }
};

export const deleteTask = async (taskid) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskid}`, {
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

export const insertTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to insert task');
    }
    return await response.json();
  } catch (error) {
    console.error('Error inserting task:', error);
    throw error;
  }
};

export const updateTask = async (taskid, taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const getTasksDueToday = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-due-today`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks due today:', error);
    throw error;
  }
};

