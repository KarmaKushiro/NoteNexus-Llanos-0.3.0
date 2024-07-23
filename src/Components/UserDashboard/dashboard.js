import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { useAuth } from '../Authorization/authContext';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import './dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [surveyInputs, setSurveyInputs] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const query = new Parse.Query(Parse.User);
        const currentUser = await query.get(user.id);
        setUserInfo({
          email: currentUser.get('email'),
          name: `${currentUser.get('firstName')} ${currentUser.get('lastName')}`,
          createdAt: currentUser.createdAt.toDateString(),
        });

        const Survey = Parse.Object.extend('Survey');
        const surveyQuery = new Parse.Query(Survey);
        surveyQuery.equalTo('user', currentUser);
        const results = await surveyQuery.find();
        setSurveyInputs(results.map(result => result.get('input')));
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        User Dashboard
      </Typography>
      {userInfo && (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {userInfo.name}</Typography>
          <Typography variant="body1"><strong>Account Created:</strong> {userInfo.createdAt}</Typography>
        </Paper>
      )}
      <Typography variant="h5" component="h2" gutterBottom>
        Survey Inputs
      </Typography>
      <List>
        {surveyInputs.map((input, index) => (
          <ListItem key={index}>
            <ListItemText primary={input} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
