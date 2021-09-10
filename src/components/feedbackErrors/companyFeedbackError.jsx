import { Alert } from "@material-ui/lab";
import { AlertTitle } from "@material-ui/lab";
import React, { useState } from "react";


function SetEmptyCompanyFeedbaclAlert() {

return (
  <Alert severity="info">
    <AlertTitle>Info</AlertTitle>
    Your Feedback is empty. <strong>Please share with us your feedback regarding this company.</strong>
  </Alert>
);

}

export default SetEmptyCompanyFeedbaclAlert;
