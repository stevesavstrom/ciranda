import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

// On this page, the Super Admin can create and delete other users.
function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
