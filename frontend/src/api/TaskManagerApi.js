// src/api/TaskManagerApi.js

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

export const getTaskManagerData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/taskmanager`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching task manager data:', error);
    throw error;
  }
};

export const insertTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/taskmanager/tasks`, {
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
    const response = await fetch(`${BASE_URL}/api/taskmanager/tasks/${taskid}`, {
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

export const deleteTask = async (taskid) => {
  try {
    const response = await fetch(`${BASE_URL}/api/taskmanager/tasks/${taskid}`, {
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

export const getTasksDueToday = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-due-today`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Tasks due today:', data); // Add this line to debug
    return data;
  } catch (error) {
    console.error('Error fetching tasks due today:', error);
    throw error;
  }
};


