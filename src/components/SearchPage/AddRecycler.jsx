import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

function AddRecycler(props) {
  const [open, setOpen] = React.useState(false);
  const emptyRecycler = {
    name: "",
    service_range: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    cleanliness: "",
    pickup_requirements: "",
    notes: "",
    recyclable_id: {
        '1': false,
        '2': false, 
        '3': false,
        '4': false, 
        '5': false,
        '6': false,
      },
    area: [],
  };
  const [newRecycler, setNewRecycler] = useState(emptyRecycler);
  const [recyclables, setRecyclables] = useState({
    '1': false,
    '2': false, 
    '3': false,
    '4': false, 
    '5': false,
    '6': false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRecycler(emptyRecycler);
  };

  const handleChange = (event) => {
    setNewRecycler({ ...newRecycler, [event.target.name]: event.target.checked });
  };

  const handleChecked = (event) => {
    setRecyclables({
      ...recyclables,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
  };

  console.log(newRecycler);
  console.log(recyclables);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Recycler
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Recycler</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete all required (*) fields and click "Submit" to add
            new recycler to the database.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Company Name"
            value={newRecycler.name}
            onChange={handleChange}
            fullWidth
            autoComplete="off"
          />
          <FormLabel component="legend">Accepted Materials</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recyclables[1]}
                  onChange={handleChecked}
                  name="1"
                />
              }
              label="Metal Drums"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recyclables[2]}
                  onChange={handleChecked}
                  name="2"
                />
              }
              label="Plastic Drums HDPE"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recyclables[3]}
                  onChange={handleChecked}
                  name="3"
                />
              }
              label="LDPE Containers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recyclables[4]}
                  onChange={handleChecked}
                  name="4"
                />
              }
              label="Plastic Film"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recyclables[5]}
                  onChange={handleChecked}
                  name="5"
                />
              }
              label="IBCs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recyclables[6]}
                  onChange={handleChecked}
                  name="6"
                />
              }
              label="Cardboard"
            />
          </FormGroup>

          <TextField
            required
            margin="dense"
            id="service_range"
            label="Service Range"
            value={newRecycler.service_range}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="website"
            label="Company Website"
            value={newRecycler.website}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="address"
            label="Street Address"
            value={newRecycler.address}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="city"
            label="City"
            value={newRecycler.city}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="state"
            label="State"
            value={newRecycler.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="zip"
            label="Zip Code"
            value={newRecycler.zip}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="phone"
            label="Phone Number"
            value={newRecycler.phone}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email Address"
            value={newRecycler.email}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="cleanliness"
            label="Cleanliness Instructions"
            value={newRecycler.cleanliness}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="pickup_requirements"
            label="Pickup Requirements"
            value={newRecycler.pickup_requirements}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="notes"
            label="Notes"
            value={newRecycler.notes}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRecycler;
