const jwt = require('jsonwebtoken');

// Admin authentication middleware
exports.adminAuth = (req, res, next) => {
    console.log("Admin authentication middleware");
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        if (decoded.role !== 'Admin') {
            console.log('User is not an admin');
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Task Manager authentication middleware
exports.taskManagerAuth = (req, res, next) => {
    console.log('Task Manager authentication middleware');
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        if (decoded.role !== 'Task Manager') {
            console.log('User is not a task manager');
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
