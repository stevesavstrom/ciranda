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
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState('');



    const handleFeedbackSubmit = () => {
        dispatch({ type: "POST_RECYCLE_FEEDBACK", payload: {name, company, email, comments}});
        setName(''); setCompany(''); setEmail(''); setComments('');
        props.closeRecyclingDialog();
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
            />

            <TextField
                margin="dense"
                label="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
            />

            <TextField
                margin="dense"
                label="What Are You Recycling?"
                value={comments}
                onChange={(event) => setComments(event.target.value)}
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