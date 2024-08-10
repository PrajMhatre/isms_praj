const express = require('express');
const router = express.Router();
const { getTeamLeaderData, deleteTask } = require('../controllers/teamLeaderController');

// Define routes
router.get('/data', getTeamLeaderData);
router.delete('/tasks/:taskid', deleteTask);

module.exports = router;
