const db = require('../config/db');

// Get all projects
const getProjects = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT project_id, project_name, project_sd, project_ed, assigned_to FROM projects');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new project
const createProject = async (req, res) => {
    const { project_name, project_sd, project_ed, assigned_to } = req.body;
    try {
        await db.query('INSERT INTO projects (project_name, project_sd, project_ed, assigned_to) VALUES (?, ?, ?, ?)',
            [project_name, project_sd, project_ed, assigned_to]);

        res.status(201).json({ message: 'Project created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProjects,
    createProject
};
