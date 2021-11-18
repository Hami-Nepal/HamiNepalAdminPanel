import React, {useState, useEffect, useCallback} from 'react';
// @material-ui/core components

import {makeStyles} from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import baseUrl from '../../api/baseUrl';

// list table import

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CauseList from 'views/CauseList/CauseList';

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    minWidth: '50px',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function AddCauseEvent() {
  const classes = useStyles();

  const [type, setType] = useState('');
  const [causeType, setCauseType] = useState('');
  const [eventType, setEventType] = useState('');
  const [causeError, setCauseError] = useState('');
  const [eventError, setEventError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const handleCauseUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    axios
      .post(
        baseUrl + 'cause_type',
        {cause_type: causeType},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      .catch(({res}) => console.log(res));
  };

  const handleEventUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    // const formData = new FormData();
    // formData.append('event_type', eventType);
    // console.log(formData);
    axios({
      method: 'POST',
      url: baseUrl + 'event_type',
      data: eventType,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        alert('Event Type Created Successfully');
        setSubmissionLoading(false);
      })
      .catch(function (response) {
        //handle error
        setEventError(response.message);
        setSubmissionLoading(false);
      });
  };

  //list table cause states
  const [deleteCauseSuccess, setDeleteCauseSuccess] = useState(false);
  const [deleteCauseError, setDeleteCauseError] = useState('');
  const [causeListSuccess, setCauseListSuccess] = useState(null);
  const [causeListError, setCauseListError] = useState(null);
  const [causeListLoading, setCauseListLoading] = useState(null);
  const [causeList, setCauseList] = useState([]);

  const fetchCauseData = async () => {
    const {data: response} = await axios.get(baseUrl + 'cause_type');
    setCauseList(response.data.Cause_type_var);
  };

  useEffect(fetchCauseData, []);

  //list table event states
  const [deleteEventSuccess, setDeleteEventSuccess] = useState(false);
  const [deleteEventError, setDeleteEventError] = useState('');
  const [eventListSuccess, setEventListSuccess] = useState(null);
  const [eventListError, setEventListError] = useState(null);
  const [eventListLoading, setEventListLoading] = useState(null);
  const [eventList, setEventList] = useState([]);

  const fetchEventData = async () => {
    const {data: response} = await axios.get(baseUrl + 'event_type');
    setEventList(response.data.Event_type_var);
  };

  useEffect(fetchEventData, []);

  const handleDeleteCause = async (id) => {
    console.log('deleted');
  };
  const handleDeleteEvent = async (id) => {
    console.log('deleted');
  };

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            Create Cause and Event Screen
          </h4>
          <p className={classes.cardCategoryWhite}>
            For Crrating and Viewing causes and Events
          </p>
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before submitting as it cannot
            be manipulated again for security reasons !
          </p>
        </CardHeader>
        <CardBody>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl style={{width: '50%'}} className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}>
                <MenuItem value={'cause'}>Cause</MenuItem>
                <MenuItem value={'event'}>Event</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          {type === 'cause' ? (
            <form onSubmit={handleCauseUpload}>
              <GridItem xs={12} sm={12} md={4}>
                <TextField
                  id="standard-basic"
                  label="Enter the cause Type"
                  value={causeType}
                  onChange={(e) => {
                    setCauseType(e.target.value);
                  }}
                  required
                  style={{width: '500px', margin: '30px 0'}}
                />
              </GridItem>
              {causeError ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Something bad happened — <strong>{causeError}</strong>
                  <br></br>
                </Alert>
              ) : (
                ''
              )}
              <GridItem xs={12} sm={12} md={4}>
                {submissionLoading ? (
                  <CircularProgress />
                ) : (
                  <Button color="primary" type="submit">
                    Create cause Type
                  </Button>
                )}
              </GridItem>
            </form>
          ) : (
            <form onSubmit={handleEventUpload}>
              <GridItem xs={12} sm={12} md={4}>
                <TextField
                  id="standard-basic"
                  label="Enter the Event Type"
                  value={eventType}
                  onChange={(e) => {
                    setEventType(e.target.value);
                  }}
                  required
                  style={{width: '500px', margin: '30px 0'}}
                />
              </GridItem>
              {eventError ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Something bad happened — <strong>{eventError}</strong>
                  <br></br>
                </Alert>
              ) : (
                ''
              )}
              <GridItem xs={12} sm={12} md={4}>
                {submissionLoading ? (
                  <CircularProgress />
                ) : (
                  <Button color="primary" type="submit">
                    Create Event Type
                  </Button>
                )}
              </GridItem>
            </form>
          )}
        </CardBody>
      </Card>
      {type === 'cause' ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Published Cause Type List
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Showing all cause types
                </p>
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>id </TableCell> */}
                        <TableCell align="center">Cause Type</TableCell>
                        <TableCell align="center">Updated At</TableCell>
                        <TableCell align="center ">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {causeListLoading ? (
                        <CircularProgress />
                      ) : causeListError ? (
                        <Alert severity="error">
                          <AlertTitle>Error</AlertTitle>
                          Something bad happened —{' '}
                          <strong>Please try again later.</strong>
                          <br></br>
                          <br></br>
                          <Button
                            onClick={fetchCauseData}
                            variant="outlined"
                            color="secondary">
                            Try Again
                          </Button>
                        </Alert>
                      ) : (
                        causeList.length &&
                        (causeList
                          ? causeList.map((row) => (
                              <TableRow key={row._id}>
                                {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                                <TableCell align="center">
                                  {row.cause_type}
                                </TableCell>
                                <TableCell align="center">
                                  {row.updatedAt.slice(0, 10)}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{cursor: 'pointer'}}>
                                  {
                                    <DeleteIcon
                                      color="secondary"
                                      onClick={() => handleDeleteCause(row._id)}
                                    />
                                  }
                                </TableCell>
                              </TableRow>
                            ))
                          : '')
                      )}
                      {deleteCauseSuccess ? (
                        <Alert severity="success">
                          <AlertTitle>Success</AlertTitle>
                          Cause type deleted Successfully
                        </Alert>
                      ) : null}
                      {deleteCauseError && (
                        <div style={{color: 'red'}}>deleteCauseError</div>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Published Event Type List
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Showing all Event Types
                </p>
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>id </TableCell> */}
                        <TableCell align="center">Event Type</TableCell>
                        <TableCell align="center">Updated At</TableCell>
                        <TableCell align="center ">Delete</TableCell>
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
                            onClick={fetchEventData}
                            variant="outlined"
                            color="secondary">
                            Try Again
                          </Button>
                        </Alert>
                      ) : (
                        eventList.length &&
                        (eventList
                          ? eventList.map((row) => (
                              <TableRow key={row._id}>
                                {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                                <TableCell align="center">
                                  {row.event_type}
                                </TableCell>
                                <TableCell align="center">
                                  {row.updatedAt.slice(0, 10)}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{cursor: 'pointer'}}>
                                  {
                                    <DeleteIcon
                                      color="secondary"
                                      onClick={() => handleDeleteEvent(row._id)}
                                    />
                                  }
                                </TableCell>
                              </TableRow>
                            ))
                          : '')
                      )}
                      {deleteEventSuccess ? (
                        <Alert severity="success">
                          <AlertTitle>Success</AlertTitle>
                          Event type deleted Successfully
                        </Alert>
                      ) : null}
                      {deleteEventError && (
                        <div style={{color: 'red'}}>deleteEventError</div>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </>
  );
}
