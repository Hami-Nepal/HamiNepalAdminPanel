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
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Link} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {listEvents} from 'store/actions/events.actions';

import api from 'api';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function EventList() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [deleteEventSuccess, setDeleteEventSuccess] = useState(false);
  const [deleteEventError, setDeleteEventError] = useState('');
  const [error, setError] = useState();

  const {
    eventListSuccess,
    eventListError,
    eventListLoading,
    eventList,
  } = useSelector((state) => state.events);

  const handleDeleteEvent = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/events/${id}`, config);
      setDeleteEventSuccess(true);
      dispatch(listEvents());
    } catch (err) {
      setError(err);
      setDeleteEventError(err);
    }
  };

  useEffect(() => {
    if (!eventListSuccess) {
      dispatch(listEvents());
    }
  }, []);
  const handlePageClick = () => {};

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/events/addNewEvent">
          <Button color="primary" type="submit">
            Add a new event
          </Button>
        </Link>

        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Events List</h4>
            <p className={classes.cardCategoryWhite}>Showing all the events</p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Summary</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Updated At</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventListLoading ? (
                    <CircularProgress />
                  ) : eventListError ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      Something bad happened —{' '}
                      <strong>Please try again later.</strong>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={(e) => dispatch(listEvents())}
                        variant="outlined"
                        color="secondary">
                        Try Again
                      </Button>
                    </Alert>
                  ) : eventList.data ? (
                    eventList.data.map((row) => (
                      <TableRow key={row._id}>
                        {/* <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell> */}
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="center">{row.summary}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">
                          {new Date(row.updatedAt).getUTCFullYear()}
                        </TableCell>
                        <TableCell align="right">
                          {
                            <Link to={`/admin/events/edit/${row._id}`}>
                              <EditIcon color="primary" />
                            </Link>
                          }
                        </TableCell>
                        <TableCell align="right" style={{cursor: 'pointer'}}>
                          {
                            <DeleteIcon
                              color="secondary"
                              onClick={() => handleDeleteEvent(row._id)}
                            />
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    ''
                  )}

                  {deleteEventSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Error</AlertTitle>
                      Event deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteEventError && (
                    <div style={{color: 'red'}}>{deleteEventError}</div>
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
