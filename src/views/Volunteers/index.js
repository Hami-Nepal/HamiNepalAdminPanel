import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'components/CustomButtons/Button.js';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {listVolunteers} from './../../store/actions/volunteers.actions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function Index() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    volunteerListSuccess,
    volunteerListError,
    volunteerListLoading,
    volunteerList,
  } = useSelector((state) => state.volunteers);

  const handleDeleteEvent = (id) => {
    console.log(id);
  };

  useEffect(() => {
    if (!volunteerListSuccess) {
      dispatch(listVolunteers());
    }
  }, []);

  return (
    <GridContainer>
      <GridItem xs={14} sm={12} md={12}>
        <Link to="/admin/volunteers/create">
          <Button color="primary" type="submit">
            Add a new Volunteer
          </Button>
        </Link>

        <Card plain>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Blood Group</TableCell>
                    {/* <TableCell align="center">Age</TableCell> */}
                    {/* <TableCell align="center">Academic Qualification</TableCell> */}
                    <TableCell align="center">Country/State/City</TableCell>
                    {/* <TableCell align="center">Created At</TableCell> */}
                    <TableCell align="center" width={100}>
                      Edit
                    </TableCell>
                    <TableCell align="center" width={100}>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteerListLoading ? (
                    <CircularProgress />
                  ) : volunteerListError ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle> Something bad happened —{' '}
                      <strong>Please try again later.</strong>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={(e) => dispatch(listVolunteers())}
                        variant="outlined"
                        color="secondary">
                        Try Again
                      </Button>
                    </Alert>
                  ) : volunteerList ? (
                    volunteerList.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell align="center">
                          {row.first_name} {row.last_name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <img
                            src={row.photo}
                            width={100}
                            height={100}
                            style={{objectFit: 'cover', borderRadius: '50%'}}
                            alt={`${row.first_name} ${row.last_name}'s Avatar`}
                          />
                        </TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.bloodGroup}</TableCell>
                        <TableCell align="center">
                          {row.country}, {row.state} {row.city}
                        </TableCell>
                        {/* <TableCell align="center">
                          {new Date(row.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </TableCell> */}
                        <TableCell align="center">
                          <Link to={`/admin/volunteers/edit/${row._id}`}>
                            <EditIcon color="primary" />
                          </Link>
                        </TableCell>
                        <TableCell align="center" style={{cursor: 'pointer'}}>
                          <DeleteIcon
                            color="secondary"
                            onClick={handleDeleteEvent}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    ''
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
