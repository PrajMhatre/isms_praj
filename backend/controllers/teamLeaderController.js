const db = require('../config/db'); // Adjust path as needed

// Get all data for Team Leader
const getTeamLeaderData = async (req, res) => {
    try {
        console.log('Received request to get all team leader data');

        // Fetch users
        const [users] = await db.query('SELECT userid, username, employee_name FROM users');
        
        // Fetch projects
        const [projects] = await db.query('SELECT project_name, project_sd, project_ed FROM projects');
        
        // Fetch tasks
        const [tasks] = await db.query('SELECT taskid, task_name, task_list, task_sd, task_ed, report_by_teammember FROM tasks');

        res.json({
            users,
            projects,
            tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a task
const deleteTask = async (req, res) => {
    const { taskid } = req.params;
    try {
        const [result] = await db.query('DELETE FROM tasks WHERE taskid = ?', [taskid]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTeamLeaderData,
    deleteTask
};
