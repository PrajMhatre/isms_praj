const db = require('../config/db'); // Adjust path as needed

// Function to get all tasks and projects data for the team member
const getTeamMemberData = async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT taskid, task_name, task_list, task_sd, task_ed, report_by_teammember FROM tasks');
        const [projects] = await db.query('SELECT project_sd, project_ed FROM projects');

        res.json({
            tasks,
            projects
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to update the report by team member
const updateTaskReport = async (req, res) => {
    const { taskid } = req.params;
    const { report_by_teammember } = req.body;
    try {
        const result = await db.query(
            'UPDATE tasks SET report_by_teammember = ? WHERE taskid = ?',
            [report_by_teammember, taskid]
        );
        if (result[0].affectedRows > 0) {
            res.json({ message: 'Task report updated successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getTeamMemberData,
    updateTaskReport
};
