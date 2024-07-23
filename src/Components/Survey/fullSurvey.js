import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useAuth } from '../Authorization/authContext';

// Material UI 
import { 
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Constants
const theme = createTheme();

const Survey = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("Pop");
  const [customGenre, setCustomGenre] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameReq, setNameReq] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const currentUser = Parse.User.current();
        if (currentUser) {
          const fName = currentUser.get('firstName') || '';
          const lName = currentUser.get('lastName') || '';
          setFirstName(fName);
          setLastName(lName);
          setNameReq(!fName || !lName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to get user data.');
      }
      };

      fetchUserInfo();
    }, [user]);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "Other") {
      setCustomGenre("");
    }
  };

  const handleTextChange = (event) => {
    setCustomGenre(event.target.value);
  };

  const handleFNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit the survey.');
      return;
    }

    try {
      const currentUser = Parse.User.current();
      // checks if current user is available
      if (!nameReq) {
        currentUser.set('firstName', firstName);
        currentUser.set('lastName', lastName);
        await currentUser.save();
      } 

      // Update List
      currentUser.set('fav_music_genre', selectedOption);
      if (selectedOption === 'Other') {
        currentUser.set('custom_genre', customGenre);
      } else {
        currentUser.unset('custom_genre'); // clears the value if it can't do it
      }

      // Verify Save of Responses
      await currentUser.save();
      alert('Survey submitted successfully!');
      setSelectedOption('Pop');
      setCustomGenre('');
      setFirstName('');
      setLastName('');
      setError('');
    } catch (error) {
      console.error('Error submitting survey:', error);
      setError('Failed to submit survey. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <MusicNoteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Survey
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">What is your favorite genre of music?</FormLabel>
            <RadioGroup value={selectedOption} onChange={handleRadioChange}>
              <FormControlLabel value="Pop" control={<Radio />} label="Pop" />
              <FormControlLabel value="Rock" control={<Radio />} label="Rock" />
              <FormControlLabel value="Hip Hop" control={<Radio />} label="Hip Hop" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            {selectedOption === "Other" && (
              <TextField
                margin="normal"
                fullWidth
                id="custom_genre"
                label="Please specify genre"
                name="custom_genre"
                autoFocus
                value={customGenre}
                onChange={handleTextChange}
                required
              />
            )}
          </FormControl>

          {nameReq && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                value={firstName}
                onChange={handleFNameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleLNameChange}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>

          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
);
};

export default Survey;