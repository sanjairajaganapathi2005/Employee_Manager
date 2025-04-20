import { useState } from 'react';
import "../styles/navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">R C TEX</h2>

        <button 
          className={`menu-icon ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>

        <div className={`navlinks ${isMenuOpen ? 'active' : ''}`}>
          <a href="#production" onClick={() => setIsMenuOpen(false)}>Production</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
          <a href="#manufacture" onClick={() => setIsMenuOpen(false)}>Manufacture</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
          <a href="/login" onClick={() => setIsMenuOpen(false)} className="login-btn">Admin Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;