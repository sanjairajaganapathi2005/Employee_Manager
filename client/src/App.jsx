import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h2 style={{ fontSize: "35px", padding: "0 1rem", marginTop: "0.5rem" }}>
        R C TEX Employee Production Details
      </h2>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Admin Login</Link>
      </nav>
    </div>
  );
}

export default App;
