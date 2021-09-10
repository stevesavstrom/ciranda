import { Alert } from "@material-ui/lab";
import { AlertTitle } from "@material-ui/lab";
import React, { useState } from "react";


function SetEmptyNewCompanyAlert() {

return (
  <Alert severity="info">
    <AlertTitle>Info</AlertTitle>
    Please provide additional information about this company. <strong>State and Material is required.</strong>
  </Alert>
);

}

export default SetEmptyNewCompanyAlert;
