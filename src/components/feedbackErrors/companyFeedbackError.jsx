import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

// Displays when feedback form is submitted but not completed by user. 

function SetEmptyCompanyFeedbackAlert() {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      Your Feedback is empty.{" "}
      <strong>
        Please share with us your feedback regarding this company.
      </strong>
    </Alert>
  );
}

export default SetEmptyCompanyFeedbackAlert;
