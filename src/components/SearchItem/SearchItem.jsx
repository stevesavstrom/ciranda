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
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import { useDispatch, useSelector } from "react-redux";
import SetEmptyCompanyFeedbackAlert from "../feedbackErrors/companyFeedbackError";

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
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    display: "inline-block",
    margin: "10px",
    marginLeft: "20px",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function SearchItem(props) {
  const theme = useTheme();
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
    contactInfoHeader: {
      fontSize: "15px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "baseline",
      variant: "p",
    },
    contactInfoData: {
      display: "flex",
      alignItems: "baseline",
      variant: "p",
    },
  });

  const user = useSelector((store) => store.user);

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
  const [editId, setEditId] = useState("");

  const handleDeleteOpen = (companyId) => {
    setDeleteId(companyId);
    setOpenDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (deleteItem) => {
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
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [emptyCompanyFeedbackOpen, setemptyCompanyFeedbackOpen] =
    React.useState(false);
  const handleEmptyCompanyOpen = () => {
    setemptyCompanyFeedbackOpen(true);
  };
  const handleEmptyCompanyClose = () => {
    setemptyCompanyFeedbackOpen(false);
  };

  // Dispatch for company feedback
  const postFeedback = (event) => {
    event.preventDefault();
    if (!customer || !email || !comment || !props.company.id) {
      handleEmptyCompanyOpen();
    } else {
      dispatch({
        type: "ADD_COMPANY_FEEDBACK",
        payload: {
          name: name,
          customer: customer,
          email: email,
          comment: comment,
          company_id: props.company.id,
        },
      });
      setOpenFeedback(false);
      setName("");
      setCustomer("");
      setEmail("");
      setComment("");
    }
  };

  const autoFillPresent = () => {
    setName("Steve");
    setCustomer("Eastside Co-op");
    setEmail("inventory@eastside.com");
    setComment(`Tried to call this company, but they're permanently closed.`);
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
  const [openRow, setRowOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    initializeMaterials();
    initializeStates();
    setEditId(id);
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

  const initializeMaterials = () => {
    let acceptedItems = props.company.item;
    for (const item of acceptedItems) {
      switch (item) {
        case "Metal Drums":
          material[1] = true;
          break;
        case "Plastic Drums HDPE":
          material[2] = true;
          break;
        case "LDPE Containers":
          material[3] = true;
          break;
        case "Plastic Film":
          material[4] = true;
          break;
        case "IBCs":
          material[5] = true;
          break;
        case "Cardboard":
          material[6] = true;
          break;
        default:
          break;
      }
    }
  };

  const initializeStates = () => {
    setSelectedStates(currentCompany.area);
  };

  const [selectedStates, setSelectedStates] = useState([]);

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
    updatedCompany.recyclable_id = materialsArray;
    updatedCompany.area = selectedStates;
    dispatch({
      type: "EDIT_LOCATION_DETAILS",
      payload: updatedCompany,
      id: editId,
      renderSearch,
    });
    handleClose();
  };

  function Row() {
    return (
      <Box>
        <React.Fragment>
          <TableRow className={classes.root}>
            <TableCell style={{ width: 50 }}>
              <IconButton
                aria-label="expand row"
                size="medium"
                onClick={() => setRowOpen(!openRow)}
              >
                {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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

            <TableCell align="left" style={{ width: 400 }}>
              {props.company.item.join(", ")}
            </TableCell>
          </TableRow>
          <TableRow className={classes.collapsible}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
              <Collapse in={openRow} timeout="auto" unmountOnExit>
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
                        <TableCell
                          className={classes.headerText}
                          align="left"
                          style={{ width: 150 }}
                        >
                          Service Range
                        </TableCell>
                        <TableCell
                          className={classes.headerText}
                          align="left"
                          style={{ width: 150 }}
                        >
                          Company Information
                        </TableCell>
                        <TableCell
                          className={classes.headerText}
                          align="left"
                          style={{ width: 350 }}
                        >
                          Recyclable Cleanliness
                        </TableCell>
                        <TableCell
                          className={classes.headerText}
                          align="left"
                          style={{ width: 350 }}
                        >
                          Pickup Requirements
                        </TableCell>
                        <TableCell
                          className={classes.headerText}
                          align="left"
                          style={{ width: 350 }}
                        >
                          Notes
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell align="left">
                          {props.company.service_range}
                        </TableCell>
                        <TableCell align="left">
                          <Typography className={classes.contactInfoHeader}>
                            Phone:
                          </Typography>
                          <Typography className={classes.contactInfoData}>
                            {props.company.phone}{" "}
                          </Typography>
                          <Typography className={classes.contactInfoHeader}>
                            Email:
                          </Typography>
                          <Typography className={classes.contactInfoData}>
                            {props.company.email}{" "}
                          </Typography>
                          <Typography className={classes.contactInfoHeader}>
                            Address:
                          </Typography>
                          <Typography className={classes.contactInfoData}>
                            {props.company.address} {props.company.city}{" "}
                            {props.company.state} {props.company.zip}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {props.company.cleanliness}
                        </TableCell>
                        <TableCell align="left">
                          {props.company.pickup_requirements}
                        </TableCell>
                        <TableCell align="left">
                          {props.company.notes}
                        </TableCell>
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
                  {user.id && (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{ margin: 2 }}
                      onClick={() => handleClickOpen(props.company.id)}
                    >
                      Edit
                    </Button>
                  )}
                  {user.id && (
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      style={{ margin: 2 }}
                      onClick={() => handleDeleteOpen(props.company.id)}
                    >
                      Delete
                    </Button>
                  )}
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
            value={updatedCompany.name}
            onChange={handleChange}
            fullWidth
            autoComplete="off"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-multiple-chip-label">
              Service States
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
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
            value={updatedCompany.service_range}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="website"
            label="Company Website"
            value={updatedCompany.website}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="address"
            label="Street Address"
            value={updatedCompany.address}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="city"
            label="City"
            value={updatedCompany.city}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="state"
            label="State"
            value={updatedCompany.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="zip"
            label="Zip Code"
            value={updatedCompany.zip}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="phone"
            label="Phone Number"
            value={updatedCompany.phone}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email Address"
            value={updatedCompany.email}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="cleanliness"
            label="Cleanliness Instructions"
            value={updatedCompany.cleanliness}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="pickup_requirements"
            label="Pickup Requirements"
            value={updatedCompany.pickup_requirements}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="notes"
            label="Notes"
            value={updatedCompany.notes}
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
      <Dialog
        open={openFeedback}
        onClose={handleFeedbackClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" onClick={autoFillPresent}>
          Company Feedback
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide feedback on this recycling company and let us know
            about your experience with them.
          </DialogContentText>

          {emptyCompanyFeedbackOpen === true && (
            <SetEmptyCompanyFeedbackAlert
              emptyCompanyFeedbackOpen={emptyCompanyFeedbackOpen}
              handleEmptyCompanyClose={handleEmptyCompanyClose}
            />
          )}

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
            required
          />

          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            required
          />

          <TextField
            margin="dense"
            id="name"
            label="Your Feedback"
            type="feedback"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            fullWidth
            required
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
