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

function AddRecycler() {
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
    recyclable_id: [
      { metalDrums: false, id: 1 },
      { plasticDrums: false, id: 2 },
      { ldpeContainers: false, id: 3 },
      { plasticFilm: false, id: 4 },
      { ibcs: false, id: 5 },
      { cardboard: false, id: 6 },
    ],
    area: [],
  };
  const [newRecycler, setNewRecycler] = useState(emptyRecycler);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRecycler(emptyRecycler);
  };

  const handleChange = (event) => {
    setNewRecycler({ ...newRecycler, [event.target.id]: event.target.value });
  };

  const handleChecked = (event) => {
      console.log(event.target.location);
      console.log(event.target.name);
      console.log(event.target.checked);
    setNewRecycler({
      ...event.target.location,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {};

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
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                  checked={newRecycler.recyclable_id[0].metalDrums}
                  onChange={handleChecked}
                  location={newRecycler.recyclable_id[0]}
                  name="metalDrums"
                />
              }
              label="Metal Drums"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecycler.recyclable_id[1].plasticDrums}
                  onChange={handleChecked}
                  location={newRecycler.recyclable_id[1]}
                  name="plasticDrums"
                />
              }
              label="Plastic Drums HDPE"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecycler.recyclable_id[2].ldpeContainers}
                  onChange={handleChecked}
                  location={newRecycler.recyclable_id[2]}
                  name="ldpeContainers"
                />
              }
              label="LDPE Containers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecycler.recyclable_id[3].plasticFilm}
                  onChange={handleChecked}
                  location={newRecycler.recyclable_id[3]}
                  name="plasticFilm"
                />
              }
              label="Plastic Film"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecycler.recyclable_id[4].ibcs}
                  onChange={handleChecked}
                  location={newRecycler.recyclable_id[4]}
                  name="ibcs"
                />
              }
              label="IBCs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecycler.recyclable_id[5].cardboard}
                  onChange={handleChecked}
                  location={newRecycler.recyclable_id[5]}
                  name="cardboard"
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
