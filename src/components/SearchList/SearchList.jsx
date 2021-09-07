import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import SearchItem from '../SearchItem/SearchItem';

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


function SearchList () {

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
                            <Table size="large" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left">Company</TableCell>
                      <TableCell align="left">Service Area</TableCell>
                      <TableCell align="left">Phone</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Materials Accepted</TableCell>
                    </TableRow>
                  </TableHead>
                  </Table>

                {companies.map(company => {
                    return (
                        <SearchItem key={company.id} company={company} />
                    )
                })}
            
        </Box>
    )
}
}

export default SearchList;