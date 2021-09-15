import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";

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
