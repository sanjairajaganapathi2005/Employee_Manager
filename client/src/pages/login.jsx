import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VITE_API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${VITE_API_URL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('loginTime', Date.now()); 

        setMessage('Login successful');
        navigate('/dashboard'); 
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.title}>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f4f7f6",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    height: "250px",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "2px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    margin: "5px 0",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default Login;

