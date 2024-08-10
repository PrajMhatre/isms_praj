const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');

// Get all tasks and projects data for the team member
router.get('/data', teamMemberController.getTeamMemberData);

// Update task report by team member
router.put('/task/:taskid/report', teamMemberController.updateTaskReport);

module.exports = router;
