import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";

function RecyclingFeedbackDialog (props) {
    const dispatch = useDispatch();
    const [recycleFeedback, setRecycleFeedback] = useState({name: '', company: '', email: '', comments: ''})

    const handleFeedbackSubmit = () => {
        dispatch({ type: "POST_RECYCLE_FEEDBACK", payload: recycleFeedback});
        setRecycleFeedback({name: '', company: '', email: '', comments: ''});
    }
    
    return (
        <Dialog open={props.recycleFeedbackDialogOpen} onClose={props.closeRecyclingDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Recycling Feedback</DialogTitle>
            <DialogContent>
            <DialogContentText>
                We'd love to hear what you're recycling today and the quantity!
            </DialogContentText>
            <TextField
                margin="dense"
                id="name"
                label="Name"
                value={recycleFeedback.name}
                onChange={(event) => setRecycleFeedback({name: event.target.value})}
                fullWidth
            />

            <TextField
                margin="dense"
                id="company"
                label="Company"
                value={recycleFeedback.company}
                onChange={(event) => setRecycleFeedback({company: event.target.value})}
                fullWidth
            />

            <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={recycleFeedback.email}
                onChange={(event) => setRecycleFeedback({email: event.target.value})}
                fullWidth
            />

            <TextField
                margin="dense"
                id="name"
                label="What Are You Recycling?"
                type="feedback"
                value={recycleFeedback.comments}
                onChange={(event) => setRecycleFeedback({comments: event.target.value})}
                required
                fullWidth
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
    )
}


export default RecyclingFeedbackDialog