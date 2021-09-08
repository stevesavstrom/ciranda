import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import RecyclingFeedback from './RecylcingFeedback';


const columns = [
  { id: 'company_name', label: 'Recycler', minWidth: 170 },
  { id: 'customer', label: 'Customer Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'comment',
    label: 'Comment',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

// the AdminPage component displays the compiled feedback from users and other Admin-only content 
function AdminPage() {
  //MUI
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isFeedback, setIsFeedback] = React.useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Dispatches & Store
  const dispatch = useDispatch();
  const feedback = useSelector(store => store.feedback);
  const rows = feedback;
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({type:'GET_FEEDBACK'});
    dispatch({type: 'GET_RECYCLING_FEEDBACK'})
  }, []);

  return (
    <>
    <Button variant="contained" color="primary" onClick={()=>setIsFeedback(true)}>Company Feedback</Button>
    <Button variant="contained" color="secondary" onClick={()=>setIsFeedback(false)}>Recycling Comments</Button>
      {/* <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div> */}
      {isFeedback ? 
      <section>
        Client Feedback
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </section>
      :
        <RecyclingFeedback />}
    </>
  );
}

// this allows us to use <App /> in index.js
export default AdminPage;
