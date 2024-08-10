// src/auth.js
export const handleLogin = (username, password, userType, setIsAuthenticated, setUserRole) => {
    // Simulate login logic
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setUserRole('admin');
      window.location.href = '/adminlogin';
    } else {
      setIsAuthenticated(true);
      setUserRole(userType);
      switch (userType) {
        case 'IT_HOD':
          window.location.href = '/ithod';
          break;
        case 'Task_Manager':
          window.location.href = '/taskmanager';
          break;
        case 'Team_Member':
          window.location.href = '/teammember';
          break;
        case 'Team_Leader':
          window.location.href = '/teamleader';
          break;
        default:
          window.location.href = '/dashboard';
          break;
      }
    }
  };
  