const db = require('../config/db');
const { format } = require('date-fns');

// Get Task Manager Data
const getTaskManagerData = async (req, res) => {
    try {
        const [users] = await db.query('SELECT userid, username, employee_name, usertype FROM users');
        const [tasks] = await db.query('SELECT taskid, task_name, task_list, task_sd, task_ed, assigned_to FROM tasks');
        const [projects] = await db.query('SELECT project_name, project_sd, project_ed FROM projects');

        res.json({
            users,
            tasks,
            projects
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Insert Task
const insertTask = async (req, res) => {
    const { task_name, task_list, task_sd, task_ed, assigned_to } = req.body;

    // Convert ISO 8601 date strings to MySQL DATETIME format
    const taskSdFormatted = format(new Date(task_sd), 'yyyy-MM-dd HH:mm:ss');
    const taskEdFormatted = format(new Date(task_ed), 'yyyy-MM-dd HH:mm:ss');

    try {
        // Ensure proper query formatting
        const [result] = await db.query(
            'INSERT INTO tasks (task_name, task_list, task_sd, task_ed, assigned_to) VALUES (?, ?, ?, ?, ?)',
            [task_name, task_list, taskSdFormatted, taskEdFormatted, assigned_to]
        );
        res.status(201).json({ message: 'Task added successfully', taskid: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//Update
const updateTask = async (req, res) => {
    const { taskid } = req.params;
    const { task_name, task_list, task_sd, task_ed, assigned_to } = req.body;

    // Function to convert ISO date string to MySQL DATETIME format
    const convertToMySQLDateTime = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    try {
        const result = await db.query(
            'UPDATE tasks SET task_name = ?, task_list = ?, task_sd = ?, task_ed = ?, assigned_to = ? WHERE taskid = ?',
            [
                task_name,
                task_list,
                convertToMySQLDateTime(task_sd),
                convertToMySQLDateTime(task_ed),
                assigned_to,
                taskid
            ]
        );

        if (result[0].affectedRows > 0) {
            res.json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    const { taskid } = req.params;

    // Ensure taskid is a number
    if (isNaN(taskid)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
        // Execute the delete query
        const result = await db.query('DELETE FROM tasks WHERE taskid = ?', [taskid]);

        // Check if any rows were affected
        if (result[0].affectedRows > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get tasks due today
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
    getTaskManagerData,
    insertTask,
    updateTask,
    deleteTask,
    getTasksDueToday
};
