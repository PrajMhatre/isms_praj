const express = require('express');
const router = express.Router();
const { getITHODData, deleteTask, insertTask, updateTask, getTasksDueToday } = require('../controllers/ithodController');

// Route to get IT HOD data
router.get('/ithod-data', getITHODData);

// Route to delete a task
router.delete('/tasks/:taskid', deleteTask);

// Route to insert a new task
router.post('/tasks', insertTask);

// Route to update a task
router.put('/tasks/:taskid', updateTask);

router.get('/tasks-due-today', getTasksDueToday);

module.exports = router;
