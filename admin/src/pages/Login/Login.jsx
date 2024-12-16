import React, { useState } from 'react';
import './Login.css'
import {assets} from '../../assets/assets'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password); // Call the parent function
  };

  return (
      <div className="admin-main">
    <div className="admin-container">
      <div className="admin-logo">
        <img src={assets.logo} alt="Logo" />
      </div>
      <div className="admin-login-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
