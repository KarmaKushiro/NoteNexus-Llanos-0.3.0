import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authorization/authContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Ensure logout function is correctly imported and used
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const handleSurveyClick = () => {
    if (!user) {
      alert('You must log in to access the Survey.'); // Alongside the protected route, there is an alert notifying the user
    } else {
      navigate('/survey'); // Navigate to the survey route if user is logged in
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" onClick={handleSurveyClick}>
            Survey
          </Button>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

