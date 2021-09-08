import { Button, FormControl, InputLabel } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function SearchItem(props) {
  const dispatch = useDispatch();
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    headerText: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    collapsible: {
      background: "#F6F6F6",
    },
    buttons: {
      justifyContent: "center",
    },
  });

  const classes = useRowStyles();

  function createData(name, address, phone, email, item) {
    return {
      name,
      address,
      phone,
      email,
      item,
    };
  }

  const rows = [
    createData(
      props.company.name,
      props.company.address,
      props.company.phone,
      props.company.email,
      props.company.item
    ),
  ];

  // Dialog for DELETE
  const [openDialog, setOpenDialog] = React.useState(false);

  // This is for the selected company to be deleted (dialog modal)
  const [deleteID, setDeleteId] = useState("");

  const handleDeleteOpen = (companyId) => {
    console.log("This is Open companyId", companyId);
    setDeleteId(companyId);
    setOpenDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (deleteItem) => {
    console.log(`Delete item`, deleteItem);
    console.log("materials", props.materials);
    console.log("selectedState", props.selectedState);
    dispatch({ type: "DELETE_LOCATION", payload: deleteItem, renderSearch });
    setOpenDialog(false);
  };

  const renderSearch = () => {
    dispatch({
      type: "FETCH_COMPANIES",
      payload: { materials: props.materials },
      selectedState: props.selectedState,
    });
  };

  // const renderSearch = { type: 'FETCH_COMPANIES', payload: {materials: props.materials}, selectedState: props.selectedState};

  // Company feedback form variables
  const [name, setName] = useState('');
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  // Dispatch for company feedback
  const postFeedback = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_COMPANY_FEEDBACK',
      payload: {
        name: name,
        customer: customer,
        email: email,
        comment: comment,
        company_id: props.company.id
      },
    });
    setOpenFeedback(false);
    setName('');
    setCustomer('');
    setEmail('');
    setComment('');

  };

  // Dialog for company feedback
  const [openFeedback, setOpenFeedback] = React.useState(false);

  const handleFeedbackOpen = () => {
    setOpenFeedback(true);
  };

  const handleFeedbackClose = () => {
    setOpenFeedback(false);
  };

 // Dialog form for EDIT
 const [open, setOpen] = React.useState(false);

 const handleClickOpen = () => {
   setOpen(true);
   setMaterialType();
   console.log("Boolean of material type:", material);
 };

 const handleClose = () => {
   setOpen(false);
 };

  const currentCompany = {
    name: props.company.name,
    service_range: props.company.service_range,
    website: props.company.website,
    address: props.company.address,
    city: props.company.city,
    state: props.company.state,
    zip: props.company.zip,
    phone: props.company.phone,
    email: props.company.email,
    cleanliness: props.company.cleanliness,
    pickup_requirements: props.company.pickup_requirements,
    notes: props.company.notes,
    recyclable_id: props.company.item,
    area: props.company.areas,
  };

  const [updatedCompany, setUpdatedCompany] = useState(currentCompany);

  const [material, setMaterial] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  function setMaterialType(event) {
    let acceptedItems = props.company.item;

    for (const item in acceptedItems) {
      switch (item) {
        case "Metal Drums":
          setMaterial(material[1]= true);
          break;
        case "Plastic Drums HDPE":
          setMaterial(material[2]= true);
          break;
        case "LDPE Containers":
          setMaterial(material[3]= true);
          break;
        case "Plastic Film":
          setMaterial(material[4]= true);
          break;
        case "IBCs":
          setMaterial(material[5]= true);
          break;
        case "Cardboard":
          setMaterial(material[6]= true);
          break;
        default:
          break;
      }
    }
  }

  const [selectedStates, setSelectedStates] = useState([]);

  // const handleClickOpen = () => {
  //   checkMaterialType();
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setNewRecycler(emptyRecycler);
  // };

  const handleChange = (event) => {
    setUpdatedCompany({
      ...updatedCompany,
      [event.target.id]: event.target.value,
    });
  };

  const handleChecked = (event) => {
    setMaterial({
      ...material,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectedStates = (event) => {
    setSelectedStates(event.target.value);
  };

  const handleSubmit = () => {
    let materialsArray = [];
    for (let i in material) {
      if (material[i] === true) {
        materialsArray.push(i);
      }
    }
    updatedCompany.recyclable_id = recyclablesIdArray;
    updatedCompany.area = selectedStates;
    dispatch({ type: "UPDATE_COMPANY", payload: updatedCompany });
    // handleClose();
  };

  function Row() {
    // const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <Box>
        <React.Fragment>
          <TableRow className={classes.root}>
            <TableCell style={{ width: 50 }}>
              <IconButton
                aria-label="expand row"
                size="medium"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell
              className={classes.headerText}
              align="left"
              style={{ width: 400 }}
              component="th"
              scope="row"
            >
              {props.company.name}
            </TableCell>
            <TableCell align="left" style={{ width: 400 }}>
              {props.company.areas.join(", ")}
            </TableCell>
            {/* <TableCell  align="left">{props.company.city}</TableCell>
          <TableCell  align="left">{props.company.state}</TableCell>
          <TableCell  align="left">{props.company.zip}</TableCell> */}

            {/* <TableCell align="left" style={{ width: 200 }}>
            {props.company.phone}
          </TableCell>
          <TableCell align="left" style={{ width: 200 }}>
            {props.company.email}
          </TableCell> */}

          <TableCell align="left" style={{ width: 400 }}>
            {props.company.item.join(", ")}
          </TableCell>
        </TableRow>
        <TableRow className={classes.collapsible}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography
                  className={classes.headerText}
                  variant="h6"
                  gutterBottom
                  component="div"
                >
                  Details
                </Typography>
                <Table size="large" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerText} style={{ width: 150 }}>
                        Service Range
                      </TableCell>
                      <TableCell className={classes.headerText} style={{ width: 390 }}>
                        Recyclable Cleanliness
                      </TableCell>
                      <TableCell className={classes.headerText} align="left" style={{ width: 390 }}>
                        Pickup Requirements
                      </TableCell>
                      <TableCell className={classes.headerText} align="left" style={{ width: 390 }}>
                        Notes
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {props.company.service_range}
                      </TableCell>
                      <TableCell>{props.company.cleanliness}</TableCell>
                      <TableCell align="left">
                        {props.company.pickup_requirements}
                      </TableCell>
                      <TableCell align="left">{props.company.notes}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box textAlign="right">
              <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ margin: 2 }}
                  onClick={handleFeedbackOpen}
                >
                  Feedback
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ margin: 2 }}
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>
                <Button 
                size="small" 
                variant="contained"
                color="secondary"
                style={{ margin: 2 }}
                onClick={() => handleDeleteOpen(props.company.id)}
                
                >
                  Delete
                </Button>
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* start of dialog box pulled from posting */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit {props.company.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete all required (*) fields and click "Submit" to update
            new recycler.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Company Name"
            value={props.company.name}
            onChange={handleChange}
            fullWidth
            autoComplete="off"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Service States</InputLabel>
            {/* <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={props.company.state}
              // onChange={handleSelectedStates}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              // MenuProps={MenuProps}
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
            </Select> */}
          </FormControl>
          <FormLabel component="legend">Accepted Materials</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={material[1]}
                  onChange={handleChecked}
                  name="1"
                />
              }
              label="Metal Drums"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material[2]}
                  onChange={handleChecked}
                  name="2"
                />
              }
              label="Plastic Drums HDPE"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material[3]}
                  onChange={handleChecked}
                  name="3"
                />
              }
              label="LDPE Containers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material[4]}
                  onChange={handleChecked}
                  name="4"
                />
              }
              label="Plastic Film"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material[5]}
                  onChange={handleChecked}
                  name="5"
                />
              }
              label="IBCs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={material[6]}
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
            value={props.company.service_range}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="website"
            label="Company Website"
            value={props.company.website}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="address"
            label="Street Address"
            value={props.company.address}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="city"
            label="City"
            value={props.company.city}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="state"
            label="State"
            value={props.company.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="zip"
            label="Zip Code"
            value={props.company.zip}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="phone"
            label="Phone Number"
            value={props.company.phone}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email Address"
            value={props.company.email}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="cleanliness"
            label="Cleanliness Instructions"
            value={props.company.cleanliness}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="pickup_requirements"
            label="Pickup Requirements"
            value={props.company.pickup_requirements}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="notes"
            label="Notes"
            value={props.company.notes}
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

      {/* Delete Button Below */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete company?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This company will permanently be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDelete(deleteID)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={openFeedback} onClose={handleFeedbackClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Company Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide feedback on this recycling company and let us know about your experience with them.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />

        <TextField
            margin="dense"
            id="name"
            label="Company"
            type="name"
            value={customer}
            onChange={(event) => setCustomer(event.target.value)}
            fullWidth
          />

          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            margin="dense"
            id="name"
            label="Please provide feedback"
            type="feedback"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackClose} color="primary">
            Cancel
          </Button>
          <Button onClick={postFeedback} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default SearchItem;
