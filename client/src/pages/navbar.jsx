import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">R C TEX</h2>
      <div className="nav-links">
        <a href="#production">Production</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
        <a href="/login">Admin Login</a>
      </div>
    </nav>
  );
}

export default Navbar;
