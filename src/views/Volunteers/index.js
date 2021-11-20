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
import api from 'api';
import baseURL from 'api/baseUrl';
import TablePagination from '@mui/material/TablePagination';

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

  const [deleteVolunteerSuccess, setDeleteVolunteerSuccess] = useState(false);
  const [deleteVolunteerError, setDeleteVolunteerError] = useState('');
  const [error, setError] = useState();

  const {
    volunteerListSuccess,
    volunteerListError,
    volunteerListLoading,
    volunteerList,
  } = useSelector((state) => state.volunteers);

  const [page, setPage] = React.useState(0);
  const [total_data, setTotal_data] = useState(0);

  const deleteVol = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/volunteers/${id}`, config);
      setDeleteVolunteerSuccess(true);
      dispatch(listVolunteers());
    } catch (err) {
      setError(err);
      setDeleteVolunteerError(err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dispatchData = () => {
    dispatch(listVolunteers(page + 1));
    // if (!volunteerListSuccess) {
    // }
  };
  useEffect(dispatchData, [page]);

  return (
    <GridContainer>
      <GridItem xs={14} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>All Volunteers List</h4>
            <p className={classes.cardCategoryWhite}>Showing All Volunteers</p>
          </CardHeader>
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
                        <TableCell align="center" style={{cursor: 'pointer'}}>
                          <DeleteIcon
                            color="secondary"
                            onClick={() => deleteVol(row._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    ''
                  )}
                  {deleteVolunteerSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Volunteer deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteVolunteerError && (
                    <div style={{color: 'red'}}>deleteVolunteerError</div>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={12}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={10}
              />
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
