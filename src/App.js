import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import About from "./Components/About.js";
import Login from './Components/Authorization/Login/login.js';
import SignUp from "./Components/Authorization/SignUp/signup.js";
//new component(s)
import ForgotPassword from "./Components/Authorization/ForgotPassword/forgotpassword.js"
import Dashboard from "./Components/UserDashboard/dashboard.js";

import Survey from "./Components/Survey/fullSurvey.js";
import { ProtectedRoute } from "./Services/protectedRoute.js";
import * as Env from "./environments.js";
import Parse from "parse";
import Header from "./Components/Header/Header.js";
import { AuthProvider, useAuth } from "./Components/Authorization/authContext.js";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const AuthRedirectRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : element;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          {/* routing, including secured when not logged in and redirects once away from signup and login once a person is logged in */}
          {/* connects to Header.js */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/survey" element={<ProtectedRoute component={Survey} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<AuthRedirectRoute element={<SignUp />} />} />
            <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
