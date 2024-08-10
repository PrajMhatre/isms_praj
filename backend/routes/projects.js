const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// Routes for projects
router.get('/', projectsController.getProjects);
router.post('/', projectsController.createProject);

module.exports = router;
