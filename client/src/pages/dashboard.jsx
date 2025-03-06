import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToProduction = () => {
    navigate('/production'); 
  };

  const handleNavigateToDesign = () => {
    navigate('/design');
  };
  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/');
  }

  // Inline CSS styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", 
      alignItems: "center", 
      height: "100vh",
      backgroundColor: "#f4f4f9",
      fontFamily: "Arial, sans-serif",
      padding: "20px", 
    },
    heading: {
      color: "#333",
      fontSize: "3rem",
      marginBottom: "20px",
      textAlign: "center", 
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row", 
      gap: "20px",
      position: "absolute",
      top: "40%", 
    },
    button: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.5rem",
      backgroundColor: "#007bff",
      color: "white",
    },

    logoutButton : {
      position: "fixed",
      top:" 5vh",
      right: "5vw", 
      padding: "10px 20px",
      backgroundColor: "#ff4d4d",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#ff3333",
    }
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.logoutButton} onClick={handlelogout}>logout</button>
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleNavigateToProduction}>
          Go to Employee Production
        </button>
        <button style={styles.button} onClick={handleNavigateToDesign}>
          Go to Design Management
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
