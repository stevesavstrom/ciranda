import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddRecycler() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return(
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Recycler
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete all fields and click "Submit" to add new recycler to the database.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Company Name"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="service_range"
            label="Service Range"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="website"
            label="Company Website"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="address"
            label="Street Address"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="city"
            label="City"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="state"
            label="State"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="zip"
            label="Zip Code"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="cleanliness"
            label="Cleanliness Instructions"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="pickup_requirements"
            label="Pickup Requirements"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="notes"
            label="Notes"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}


export default AddRecycler;