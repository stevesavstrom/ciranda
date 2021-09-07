import React from "react";
import PropTypes from "prop-types";
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
import { Button } from "@material-ui/core";

function SearchItem(props) {
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

  function Row() {
    // const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>                  
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="large"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className={classes.headerText} component="th" scope="row">
            {props.company.name}
          </TableCell>
          <TableCell  align="left">{props.company.areas}</TableCell>
          {/* <TableCell  align="left">{props.company.city}</TableCell>
          <TableCell  align="left">{props.company.state}</TableCell>
          <TableCell  align="left">{props.company.zip}</TableCell> */}



          <TableCell align="left">{props.company.phone}</TableCell>
          <TableCell  align="left">{props.company.email}</TableCell>
          <TableCell  align="left">{props.company.item.join(', ') }</TableCell>
        </TableRow>
        <TableRow className={classes.collapsible}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography className={classes.headerText} variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="large" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerText}>Service Range</TableCell>
                      <TableCell className={classes.headerText}>Recyclable Cleanliness</TableCell>
                      <TableCell className={classes.headerText} align="left">Pickup Requirements</TableCell>
                      <TableCell className={classes.headerText} align="left">Notes</TableCell>
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
              <Box textAlign='right'>
              <Button size="small" variant="contained" color="primary" style={{ margin: 5}}>Edit</Button>
              <Button size="small" variant="contained" color="secondary">Delete</Button>
              </Box>
            </Collapse>
          </TableCell>
  
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      address: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">

        {/* <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.headerText}>Company</TableCell>
            <TableCell className={classes.headerText} align="left">Address</TableCell>
            <TableCell className={classes.headerText} align="left">Phone</TableCell>
            <TableCell className={classes.headerText} align="left">Email</TableCell>
            <TableCell className={classes.headerText} align="left">Materials Accepted</TableCell>
          </TableRow>
        </TableHead> */}

        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SearchItem;
