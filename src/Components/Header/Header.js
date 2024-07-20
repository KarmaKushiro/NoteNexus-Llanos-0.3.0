import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authorization/authContext';
import './Header.css';

// This file makes the header bar at the top of the screen
const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Ensure logout function is correctly imported and used
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
    <div>
      {/* The large_only allows for items to vanish from nav bar when screen size shrinks
          Would link these to other pages, but currently do not understand how to */}
      <ul className="top_nav_bar">
        <li className="left"><Link to="/">Home</Link></li>
        <li className="right"><Link to="/about">About</Link></li>
        <li className='right'><Link to="/survey" onClick={handleSurveyClick}>Survey</Link></li>
        {/*<li class="right large_only"><a href="">Option 1</a></li>
        <li class="right large_only"><a href="">Option 2</a></li>
        <li class="right large_only"><a href="">Option 3</a></li>*/}

        {/* Signup and Login appear when user is logged in, logout appears when user is logged into the program */}
        {user ? (
          <>
            <li className='right'>
              <button className='logoutButton' onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="right"><Link to="/signup">Sign Up</Link></li>
            <li className="right"><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
