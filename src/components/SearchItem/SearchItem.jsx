import React from "react";
import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from "prop-types";

// Material-UI imports
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

import EditForm from '../EditForm/EditForm';

function SearchItem(props) {
  const dispatch = useDispatch();
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
  
      },
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: "16px",
    },
    collapsible: {
      background: "#F6F6F6",
    },
    buttons: {
      justifyContent: 'center',
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

  // Dialog form for EDIT
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Dialog for DELETE
  const [openDialog, setOpenDialog] = React.useState(false);

  // This is for the selected company to be deleted (dialog modal)
  const [deleteID, setDeleteId] = useState('');

  const handleDeleteOpen = (companyId) => {
    console.log('This is Open companyId', companyId);
    setDeleteId(companyId)
    setOpenDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (deleteItem) => {
    console.log(`Delete item`, deleteItem);
    console.log('materials', props.materials);
    console.log('selectedState', props.selectedState);
    dispatch({ type: 'DELETE_LOCATION', payload: deleteItem, renderSearch })
    setOpenDialog(false);
  }

  const renderSearch = () => {
    dispatch({ type: 'FETCH_COMPANIES', payload: {materials: props.materials}, selectedState: props.selectedState})
  }

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
          <TableCell 
          align="left" 
          style={{ width: 400 }}>
            {props.company.areas}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.company.name}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.company.email}
            type="email"
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
