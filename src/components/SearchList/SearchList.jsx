import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import SearchItem from '../SearchItem/SearchItem';

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


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
    
      const classes = useRowStyles();

const companies = useSelector(store => store.userSearch);
console.log('Companies:', companies);

if (companies.length === 0) {
    return(
        <section>
            <h1>Adjust your filters to find recycling companies</h1>
        </section>
    )
} else {
    return (

        
        <Box style={{ padding: 20, }}>
                  <Table size="medium" aria-label="purchases">
                  <TableHead align="left">
                    <TableRow align="left">
                      <TableCell className={classes.tableHeader} align="left" style={{ width: 50 }}></TableCell>
                      <TableCell className={classes.tableHeader} align="left" style={{ width: 400 }}>Company</TableCell>
                      <TableCell className={classes.tableHeader} align="left" style={{ width: 400 }}>Service Area</TableCell>
                      {/* <TableCell className={classes.tableHeader} align="left" style={{ width: 200 }}>Phone</TableCell>
                      <TableCell className={classes.tableHeader} align="left" style={{ width: 200 }}>Email</TableCell> */}
                      <TableCell className={classes.tableHeader} align="center" style={{ width: 400 }}>Materials Accepted</TableCell>
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