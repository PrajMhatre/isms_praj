const express = require('express');
const router = express.Router();
const taskManagerController = require('../controllers/taskManagerController');

// Get Task Manager Data
router.get('/', taskManagerController.getTaskManagerData);

// Insert Task
router.post('/tasks', taskManagerController.insertTask);

// Update Task
router.put('/tasks/:taskid', taskManagerController.updateTask);

// Delete Task
router.delete('/tasks/:taskid', taskManagerController.deleteTask);

// Get tasks due today
router.get('/tasks-due-today', taskManagerController.getTasksDueToday);

module.exports = router;
