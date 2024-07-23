import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { useAuth } from '../Authorization/authContext';
import { 
    Container, 
    Typography, 
    Paper, 
    List, 
    ListItem, 
    ListItemText 
} from '@mui/material';
import './dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [surveyInputs, setSurveyInputs] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Fetch who the user is
        const query = new Parse.Query(Parse.User);
        const currentUser = await query.get(user.id);

        setUserInfo({ // displays the user's information
          email: currentUser.get('email'),
          name: `${currentUser.get('firstName') || ''} ${currentUser.get('lastName') || ''}`,
          createdAt: currentUser.createdAt.toDateString(),
        });

        const favMusicGenre = currentUser.get('fav_music_genre');
        const customGenre = currentUser.get('custom_genre');
        
        // List of Responses
        const inputs = [];
        if (favMusicGenre) {
            inputs.push(`Favorite Music Genre: ${favMusicGenre}`);
        }
        if (customGenre && favMusicGenre === 'Other') {
            inputs.push(`Favorite Music Genre(custom): ${customGenre}`);
        }

        setSurveyInputs(inputs);
      } catch (error) {
        console.error('Error fetching user info: ', error);
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
        {surveyInputs.length > 0 ? (
          surveyInputs.map((input, index) => (
            <ListItem key={index}>
              <ListItemText primary={input} />
            </ListItem>
          ))
        ) : (
          <Typography>No survey inputs found.</Typography>
        )}
      </List>
    </Container>
  );
};

export default Dashboard;