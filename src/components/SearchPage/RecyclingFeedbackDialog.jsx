import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SetEmptyFeedbackAlert from "../feedbackErrors/feedbackDialogError";

// Contains Feedback toast and modal form that is displayed from SearchPage.

function RecyclingFeedbackDialog(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [emptyFeedbackAlert, setEmptyFeedbackAlert] = React.useState(false);

  const handleAlertPopup = () => {
    setEmptyFeedbackAlert(true);
  };
  const closeAlertPopup = () => {
    setEmptyFeedbackAlert(false);
  };

  const handleFeedbackSubmit = () => {
    if (!company || !email || !comment) {
      handleAlertPopup();
    } else {
      dispatch({
        type: "POST_RECYCLE_FEEDBACK",
        payload: { name, company, email, comment },
      });
      setEmptyFeedbackAlert(false);
      setName("");
      setCompany("");
      setEmail("");
      setComment("");
      props.closeRecyclingDialog();
    }
  };

  const handleAutoFill = () => {
    setName("Steve");
    setCompany("Eastside Co-op");
    setEmail("inventory@eastside.com");
    setComment(
      "I recycled 200lbs of cardboard last week.  The company even picked it up for me!"
    );
  };

  return (
    <Dialog
      open={props.recycleFeedbackDialogOpen}
      onClose={props.closeRecyclingDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" onClick={handleAutoFill}>
        Recycling Feedback
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We'd love to hear what you're recycling today and the quantity!
        </DialogContentText>

        {emptyFeedbackAlert === true && (
          <SetEmptyFeedbackAlert
            emptyFeedbackAlert={emptyFeedbackAlert}
            closeAlertPopup={closeAlertPopup}
          />
        )}

        <TextField
          margin="dense"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          fullWidth
          required
        />
        <TextField
          margin="dense"
          label="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          required
        />
        <TextField
          margin="dense"
          label="What Are You Recycling?"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeRecyclingDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFeedbackSubmit} color="secondary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecyclingFeedbackDialog;
