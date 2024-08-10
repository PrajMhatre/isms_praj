const db = require('../config/db'); // Adjust path as needed

// Function to get IT HOD data
const getITHODData = async (req, res) => {
    try {
        const [users] = await db.query('SELECT userid, username, employee_name FROM users');
        const [projects] = await db.query('SELECT project_name, project_sd, project_ed FROM projects');
        const [tasks] = await db.query('SELECT taskid, task_name, task_list FROM tasks');

        res.json({
            users,
            projects,
            tasks
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
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

// Function to insert a new task
const insertTask = async (req, res) => {
    const { task_name, task_list, task_sd, task_ed, report_by_teammember } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO tasks (task_name, task_list, task_sd, task_ed, report_by_teammember) VALUES (?, ?, ?, ?, ?)',
            [task_name, task_list, task_sd, task_ed, report_by_teammember]
        );
        res.json({ message: 'Task inserted successfully', taskId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a task
const updateTask = async (req, res) => {
    const { taskid } = req.params;
    const { task_name, task_list, task_sd, task_ed, report_by_teammember } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE tasks SET task_name = ?, task_list = ?, task_sd = ?, task_ed = ?, report_by_teammember = ? WHERE taskid = ?',
            [task_name, task_list, task_sd, task_ed, report_by_teammember, taskid]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTasksDueToday = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT taskid, task_name, task_ed
        FROM tasks
        WHERE task_ed = CURDATE()
      `);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching tasks due today:', error);
      res.status(500).send('Server Error');
    }
  };
  
module.exports = {
    getITHODData,
    deleteTask,
    insertTask,
    updateTask,
    getTasksDueToday
};
