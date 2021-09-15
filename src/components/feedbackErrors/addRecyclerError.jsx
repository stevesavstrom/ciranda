import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

// Displays when new company form is submitted but not complete. 

function SetEmptyNewCompanyAlert() {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      Please provide additional information about this company.{" "}
      <strong>State and Material is required.</strong>
    </Alert>
  );
}

export default SetEmptyNewCompanyAlert;
