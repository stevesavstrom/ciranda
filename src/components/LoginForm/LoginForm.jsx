import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

// Login form component for Admins and Super Admin to log in. Imported into LoginPage.jsx
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const paperStyle={padding:20, height:'70vh' ,width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor: '#1bbd7e'}

  return (
    <Grid>
        <Paper elevation={10} style ={paperStyle}>
            <Grid align='center'>
                <Avatar><LockOutlined/></Avatar>
            </Grid>
        <h2>Welcome to Ciranda</h2>
    <TextField label='Username' placeholder='Enter Username' value={username} onChange={(event) => setUsername(event.target.value)} fullWidth required/>
    <TextField label='Password' placeholder='Enter password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} fullWidth required/>
    <FormControlLabel
        control={
          <Checkbox
              name="checked"
              color="primary"
          />
        }
        label="Remember me"
      />
      <Button type='submit' color='primary' variant="contained" onClick={login} fullWidth>Sign In</Button>
   
    </Paper>
    </Grid>
    
  );
}

export default LoginForm;
