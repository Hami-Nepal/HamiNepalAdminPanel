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
import {
  listVolunteers,
  verifyVolunteer,
} from './../../store/actions/volunteers.actions';

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

  const handleVerifyVolunteerClicked = (id) => dispatch(verifyVolunteer(id));

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
                    <TableCell> </TableCell>
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
                      Actions
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
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={() => handleVerifyVolunteerClicked(row._id)}
                          style={{
                            color: row.is_verified ? 'green' : 'gray',
                            cursor: 'pointer',
                          }}>
                          <VerifiedUserIcon />
                        </TableCell>
                        <TableCell align="right">
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
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">
                          {row.bloodGroup}
                        </TableCell>
                        <TableCell align="right">
                          {row.country}, {row.state} {row.city}
                        </TableCell>
                        {/* <TableCell align="right">
                          {new Date(row.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </TableCell> */}
                        <TableCell align="right">
                          <Link to={`/ admin / volunteers / ${row._id}`}>
                            <VisibilityIcon color="primary" />
                          </Link>
                          <Link to={`/admin/volunteers/${row._id}/edit`}>
                            <EditIcon color="primary" />
                          </Link>
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
