import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

// Login form component for Admins and Super Admin to log in. 
function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
