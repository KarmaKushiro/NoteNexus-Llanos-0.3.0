import React, { useState } from 'react';
import Parse from 'parse';
import { useAuth } from '../Authorization/authContext';
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

const theme = createTheme();

const Survey = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("Pop");
  const [customGenre, setCustomGenre] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "Other") {
      setCustomGenre("");
    }
  };

  const handleTextChange = (event) => {
    setCustomGenre(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit the survey.');
      return;
    }

    const Survey = Parse.Object.extend('Survey');
    const survey = new Survey();

    survey.set('fav_music_genre', selectedOption);
    survey.set("custom_genre", selectedOption === 'Other' ? customGenre : selectedOption);
    survey.set('name', name);
    survey.set('user', user);

    try {
      await survey.save();
      alert('Survey submitted successfully!');
      setSelectedOption('Pop');
      setCustomGenre('');
      setName('');
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="What is your name?"
              name="name"
              value={name}
              onChange={handleNameChange}
            />

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
