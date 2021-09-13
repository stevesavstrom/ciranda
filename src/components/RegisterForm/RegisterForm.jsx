import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router';

import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

// Used by Super Admin to register other users. Imported into RegisterPage component
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  // const [registerUser, setRegisterUser] = useState('');
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        email: email,
        password: password,
      },
    });
    setUsername('');
    setEmail('');
    setPassword('');
    history.push('/search');
  }; 

  const paperStyle={padding:20, height:'50vh' ,width:400, margin:"20px auto"}
  const avatarStyle={backgroundColor: '#1bbd7e'}


  return (
    <Grid>
        <Paper elevation={10} style ={paperStyle}>
        <h2 align='center'>Register New Administrator</h2>
    <TextField label='Username' placeholder='Enter Username' value={username} onChange={(event) => setUsername(event.target.value)} fullWidth required/>
    <TextField label='Email' type='email' placeholder='Enter Email' value={email} onChange={(event) => setEmail(event.target.value)} fullWidth required/>
    <TextField label='Password' type='password' placeholder='Enter password' value={password} onChange={(event) => setPassword(event.target.value)} fullWidth required/>
    <p></p>

      <Button type='submit' color='primary' variant="contained" onClick={registerUser} fullWidth>Create New Admin</Button>

        
    </Paper>
    </Grid>
  );
}

export default RegisterForm;
