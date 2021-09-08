import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

function SearchList ({materials, selectedState}) {

    const useRowStyles = makeStyles({
        root: {
          "& > *": {
            borderBottom: "unset",
          },
        },
        tableHeader: {
            fontSize: "18px",
            color: "#fff",
            background: '#2E61A9',
        },

      });
      const classes = useStyles();
      const rowClasses = useRowStyles();

const companies = useSelector(store => store.userSearch);

if (companies.length === 0) {
    return(
        <section className={classes.root}>
            <Alert className={classes.alert} severity="info">Please refine search criteria to return results.</Alert>
        </section>
    )
} else {
    return (

        
        <Box style={{ padding: 20, }}>
                  <Table size="medium" aria-label="purchases">
                  <TableHead align="left">
                    <TableRow align="left">
                      <TableCell className={rowClasses.tableHeader} align="left" style={{ width: 50 }}></TableCell>
                      <TableCell className={rowClasses.tableHeader} align="left" style={{ width: 400 }}>Company</TableCell>
                      <TableCell className={rowClasses.tableHeader} align="left" style={{ width: 400 }}>Service Area</TableCell>
                      {/* <TableCell className={rowClasses.tableHeader} align="left" style={{ width: 200 }}>Phone</TableCell>
                      <TableCell className={rowClasses.tableHeader} align="left" style={{ width: 200 }}>Email</TableCell> */}
                      <TableCell className={rowClasses.tableHeader} align="center" style={{ width: 400 }}>Materials Accepted</TableCell>
                    </TableRow>
                  </TableHead>
                  </Table>

                {companies.map(company => {
                    return (
                        <SearchItem key={company.id} company={company} materials={materials} selectedState={selectedState} />
                    )
                })}
            
        </Box>
    )
}
}

export default SearchList;