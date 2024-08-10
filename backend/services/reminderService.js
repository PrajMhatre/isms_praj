const cron = require('node-cron');
const db = require('../config/db'); // Adjust the path as per your project structure
const { sendReminderNotification } = require('./notificationService');

const checkTasksDueToday = async () => {
  const today = new Date().toISOString().split('T')[0];

  const query = `
    SELECT taskid, task_name, project_ed
    FROM tasks
    WHERE project_ed = ?
  `;

  db.query(query, [today], (error, results) => {
    if (error) {
      console.error('Error fetching tasks due today:', error);
      return;
    }

    if (results.length > 0) {
      results.forEach(task => {
        sendReminderNotification(task); // Send reminder notification
      });
    }
  });
};

// Schedule the job to run at midnight every day
cron.schedule('0 0 * * *', checkTasksDueToday);
