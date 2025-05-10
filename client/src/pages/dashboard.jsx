import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIndustry, FaPalette, FaChartBar, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/');
  };

  // Responsive styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(-45deg, rgb(65, 147, 201), rgb(78, 60, 177))",
      backgroundSize: "400% 400%",
      animation: "gradient 15s ease infinite",
      fontFamily: "'Poppins', sans-serif",
      padding: "1rem",
      position: "relative",
      overflowX: "hidden",
      color: "#fff",
    },
    mobileMenuButton: {
      display: "none",
      position: "absolute",
      top: "1.5rem",
      left: "1.5rem",
      backgroundColor: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "1.8rem",
      cursor: "pointer",
      zIndex: "1000",
      '@media (max-width: 768px)': {
        display: "block",
      }
    },
    mobileMenu: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: "999",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease",
    },
    mobileMenuItem: {
      padding: "1.5rem",
      fontSize: "1.5rem",
      color: "#fff",
      textDecoration: "none",
      width: "100%",
      textAlign: "center",
      '&:hover': {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }
    },
    heading: {
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      margin: "clamp(1rem, 3vw, 2rem) 0",
      textAlign: "center",
      fontWeight: "700",
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      background: "linear-gradient(to right, #fff, #f0f0f0)",
      WebkitBackgroundClip: "text",
      padding: "0 1rem",
    },
    buttonContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
      gap: "clamp(1rem, 3vw, 2rem)",
      width: "min(90%, 1200px)",
      margin: "clamp(1rem, 3vw, 2rem) 0",
      padding: "0 1rem",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "clamp(200px, 30vw, 280px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      '&:hover': {
        transform: "translateY(-10px)",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      }
    },
    cardIcon: {
      fontSize: "clamp(3rem, 6vw, 4.5rem)",
      marginBottom: "clamp(0.5rem, 2vw, 1.5rem)",
      color: "yellow",
      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
    },
    cardTitle: {
      fontSize: "clamp(1.2rem, 3vw, 2rem)",
      fontWeight: "600",
      marginBottom: "clamp(0.5rem, 1vw, 1rem)",
      color: "#fff",
      textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
    },
    cardDescription: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
      lineHeight: "1.6",
    },
    logoutButton: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      padding: "clamp(0.5rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 1.8rem)",
      backgroundColor: "red",
      color: "#fff",
      fontWeight: "600",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "clamp(0.3rem, 1vw, 0.8rem)",
      backdropFilter: "blur(5px)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      fontSize: "clamp(0.8rem, 2vw, 1rem)",
      '&:hover': {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        transform: "translateY(-2px)",
      },
    },
  };

  // Animation keyframes
  const animationStyles = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  // Card data
  const cards = [
    {
      title: "Employee Production",
      description: "Manage and track employee metrics",
      icon: <FaIndustry style={styles.cardIcon} />,
      path: '/production'
    },
    {
      title: "Design Management",
      description: "Create and manage design projects",
      icon: <FaPalette style={styles.cardIcon} />,
      path: '/design'
    },
    {
      title: "Weekly Report",
      description: "View performance reports",
      icon: <FaChartBar style={styles.cardIcon} />,
      path: '/weekreport'
    }
  ];

  return (
    <div style={styles.container}>
      <style>{animationStyles}</style>
      
      {/* Mobile Menu Button (visible only on small screens) */}
      <button 
        style={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars />
      </button>
      
      {/* Mobile Menu (slides in from left) */}
      <div style={styles.mobileMenu}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={styles.mobileMenuItem}
            onClick={() => handleNavigation(card.path)}
          >
            {card.title}
          </div>
        ))}
      </div>
      
      {/* Logout Button */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
      
      {/* Main Content */}
      <h1 style={styles.heading}>Dashboard</h1>
      
      <div style={styles.buttonContainer}>
        {cards.map((card, index) => (
          <div 
            key={index} 
            style={styles.card} 
            onClick={() => handleNavigation(card.path)}
          >
            {card.icon}
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
