const sendReminderNotification = (task) => {
    const { taskid, task_name, project_ed } = task;
  
    // Add logic to send notification to IT HOD, Task Manager, Team Leader, and Team Member
    // This could be a database insert to a notifications table or any other notification mechanism
    console.log(`Reminder: Task "${task_name}" is due today (${project_ed}).`);
  };
  
  module.exports = {
    sendReminderNotification,
  };
  