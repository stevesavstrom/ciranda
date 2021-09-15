import { FormControl, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SetEmptyNewCompanyAlert from "../feedbackErrors/addRecyclerError";

function getStyles(stateName, stateArray, theme) {
  return {
    fontWeight:
      stateArray.indexOf(stateName) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    paddingBottom: "20px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    display: "inline-block",
    margin: "10px",
    marginLeft: "20px",
    fontSize: "12px",
    width: "130px",
    padding: "10px",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// AddRecycler contains all logic and UI for the Add Recycler button and form. 

function AddRecycler(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();
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
    recyclable_id: [],
    area: [],
  };
  const emptyRecyclables = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };

  const [newRecycler, setNewRecycler] = useState(emptyRecycler);
  const [recyclables, setRecyclables] = useState(emptyRecyclables);

  const [selectedStates, setSelectedStates] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRecycler(emptyRecycler);
  };

  const handleChange = (event) => {
    setNewRecycler({
      ...newRecycler,
      [event.target.id]: event.target.value,
    });
  };

  const handleChecked = (event) => {
    setRecyclables({
      ...recyclables,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectedStates = (event) => {
    setSelectedStates(event.target.value);
  };

  const handleSubmit = () => {
    let recyclablesIdArray = [];
    for (let i in recyclables) {
      if (recyclables[i] === true) {
        recyclablesIdArray.push(i);
      }
    }
    if (
      !newRecycler.name ||
      !newRecycler.service_range ||
      !recyclablesIdArray ||
      !selectedStates ||
      !newRecycler.email
    ) {
      handleAlertPopup();
    } else {
      newRecycler.recyclable_id = recyclablesIdArray;
      newRecycler.area = selectedStates;
      dispatch({ type: "ADD_RECYCLER", payload: newRecycler });
      setSelectedStates([]);
      setRecyclables(emptyRecyclables);
      handleClose();
      setemptyNewCompany(false);
    }
  };

  const [emptyNewCompany, setemptyNewCompany] = React.useState(false);

  const handleAlertPopup = () => {
    setemptyNewCompany(true);
  };
  const closeAlertPopup = () => {
    setemptyNewCompany(false);
  };

  const presentPopulate = () => {
    setNewRecycler({
      name: "NPM Disposal",
      service_range: "Local",
      website: "http://www.npmdisposal.com",
      address: "19823 Disposal Ln",
      city: "Rochester",
      state: "MN",
      zip: "55901",
      phone: "651-555-3333",
      email: "customercare@npmdisposal.com",
      cleanliness: "Drip dry",
      pickup_requirements: "Can't pickup",
      notes: "Has information on local transportation companies for pickup",
      recyclable_id: [],
      area: [],
    });
  };

  return (
    <div>
      <Typography variant="inherit" onClick={handleClickOpen}>
        Add Recycler
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" onClick={presentPopulate}>
          Add Recycler
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete all required (*) fields and click "Submit" to add
            new recycler to the database.
          </DialogContentText>

          {emptyNewCompany === true && (
            <SetEmptyNewCompanyAlert
              emptyNewCompany={emptyNewCompany}
              closeAlertPopup={closeAlertPopup}
            />
          )}

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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">
              Service States*
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedStates}
              onChange={handleSelectedStates}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {props.states.map((state) => (
                <MenuItem
                  key={state.value}
                  value={state.value}
                  style={getStyles(state.label, selectedStates, theme)}
                >
                  {state.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormLabel component="legend">Accepted Materials*</FormLabel>
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
            label="Service Range (Local, Regional, or National)"
            value={newRecycler.service_range}
            onChange={handleChange}
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
            margin="dense"
            id="phone"
            label="Phone Number"
            value={newRecycler.phone}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            id="website"
            label="Company Website"
            value={newRecycler.website}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            id="address"
            label="Street Address"
            value={newRecycler.address}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            value={newRecycler.city}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            id="state"
            label="State"
            value={newRecycler.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="zip"
            label="Zip Code"
            value={newRecycler.zip}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            id="cleanliness"
            label="Cleanliness Instructions"
            value={newRecycler.cleanliness}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            id="pickup_requirements"
            label="Pickup Requirements"
            value={newRecycler.pickup_requirements}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
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
