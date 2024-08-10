const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    console.log('Logging in user...');
    const { username, password } = req.body;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            console.log('Password incorrect');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user[0].userid, role: user[0].usertype }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful');
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    console.log('Logging out user...');
    res.json({ message: 'Logout successful' });
};
