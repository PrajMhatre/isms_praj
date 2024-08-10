const db = require('../config/db');

// Get all users
const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT userid, username, employee_name, usertype, password,  email_id, phone  FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { username, employee_name, password, usertype, email_id, phone } = req.body;
    try {
        await db.query('INSERT INTO users (username, employee_name, password, usertype, email_id, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [username, employee_name, password, usertype, email_id, phone]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { userid } = req.params;
    const { username, employee_name, password, usertype, email_id, phone } = req.body;
    try {
        await db.query('UPDATE users SET username = ?, employee_name = ?, password = ?, usertype = ?, email_id = ?, phone = ? WHERE userid = ?',
            [username, employee_name, password, usertype, email_id, phone, userid]);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { userid } = req.params;
    try {
        await db.query('DELETE FROM users WHERE userid = ?', [userid]);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};