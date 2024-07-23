import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Parse from 'parse';

// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <RouterLink to='/'>
      <Link color="inherit">
        NoteNexus
      </Link></RouterLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // will remember the user by retrieving the local data of their input in login
  useEffect(() => {
  const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
  if (rememberMeValue) {
    setId(localStorage.getItem('email') || localStorage.getItem('username') || '');
    setPassword(localStorage.getItem('password') || '');
    setRememberMe(true);
  }
  }, []);

  //handles the login form
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const isEmail = id.includes('@');
      const query = new Parse.Query(Parse.User);
      // check if it's a username or email
      if (isEmail) {
        query.equalTo('email', id);
      } else {
        query.equalTo('username', id);
      }
      const user = await query.first();
      if (user) {
        await Parse.User.logIn(user.get('username'), password);
        console.log('User logged in successfully:', user);
        setError('');

        // If rememberMe is true then the values are pre-filled, and local data is removed if not
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', user.get('username'));
          localStorage.setItem('email', user.get('email'));
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        // Redirect or show a success message
        navigate('/survey');
        window.location.reload();
      } else {
        setError('Invalid username or email.')
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password.')
      }
    };
    
    const handleRememberMeChange = (event) => {
      setRememberMe(event.target.checked);
    };

  //returns login form
  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Username or Email"
              name="id"
              autoComplete="usernmae"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} color="primary" />}
              label="Remember me"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant='body2' align='center'>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
