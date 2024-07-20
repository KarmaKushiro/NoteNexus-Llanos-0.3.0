import React, { useState } from 'react';
import Parse from 'parse';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //handles the login form
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Parse.User.logIn(email, password);
      console.log('User logged in successfully:', user);
      // Redirect or show a success message
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  //returns login form
  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
