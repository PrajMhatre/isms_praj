// Example API call for team member data
export const getTeamMemberData = async () => {
    try {
      const response = await fetch('http://localhost:3000/teamMember/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching team member data:', error);
      throw error;
    }
  };
  
  // Example API call for updating task report
  export const updateTaskReport = async (taskid, reportData) => {
    try {
      const response = await fetch(`http://localhost:3000/teamMember/task/${taskid}/report`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        throw new Error('Failed to update task report');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating task report:', error);
      throw error;
    }
  };
  