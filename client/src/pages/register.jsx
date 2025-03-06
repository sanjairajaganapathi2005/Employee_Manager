import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Password strength regex
const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{8,}$/;

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // API URL from environment variable
  const VITE_API_URL = import.meta.env.VITE_API_URL; 



const handleRegister = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post(`${VITE_API_URL}/api/register`, {
      email: email, 
      password: password, 
      confirmPassword: confirmPassword, 
    });

    if (response.data.success) {
      console.log('User registered successfully:', response.data.message);
      navigate('/login');
    }

  } catch (error) {
    if (error.response) {
      console.error('Server Error:', error.response.data.message);
      alert(error.response.data.message);
    } else if (error.request) {
      console.error('Network Error: No response received');
      alert('Network Error: Unable to reach the server. Please try again later.');
    } else {
      console.error('Unexpected Error:', error.message);
      alert('Unexpected error occurred. Please try again later.');
    }
  }
};

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h1 style={styles.title}>Register</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
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
    height: "350px", 
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

export default Register;
