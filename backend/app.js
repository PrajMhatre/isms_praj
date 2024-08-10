const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const taskManagerRoutes = require('./routes/taskManagerRoutes');
const teamLeaderRoutes = require('./routes/teamLeaderRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const ithodRoutes = require('./routes/ithodRoutes');
require('./services/reminderService');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/taskmanager', taskManagerRoutes);
app.use('/api/team-leader', teamLeaderRoutes);
app.use('/teamMember', teamMemberRoutes); 
app.use('/ithod', ithodRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
