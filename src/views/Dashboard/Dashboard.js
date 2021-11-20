import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Update from '@material-ui/icons/Update';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import {useDispatch, useSelector} from 'react-redux';
import {listVolunteers} from './../../store/actions/volunteers.actions';
import CircularProgress from '@material-ui/core/CircularProgress';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import baseUrl from '../../api/baseUrl';
import axios from 'axios';


const useStyles = makeStyles(styles);

export default function Dashboard() {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  const classes = useStyles();
  const [totalDonations, serTotalDonations] = useState(null);
  const [donationLoading, setDonationLoading] = useState(true);
  const [totalExpenses, serTotalExpenses] = useState(null);
  const [totalExpensesLoading, serTotalExpensesLoading] = useState(true);

  const dispatch = useDispatch();

  const {
    volunteerListSuccess,
    volunteerListError,
    volunteerListLoading,
    volunteerList,
  } = useSelector((state) => state.volunteers);

  useEffect(() => {
    if (!volunteerListSuccess) {
      dispatch(listVolunteers());
    }
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(async () => {
    const response = await axios.get(baseUrl + 'find/totalDonations', config);
    serTotalDonations((response.data && response.data.data[0])? response.data.data[0].donation : 0);
    setDonationLoading(false);
  }, []);
  useEffect(async () => {
    const response = await axios.get(baseUrl + 'find/totalExpenses', config);
    serTotalExpenses((response.data && response.data.data[0]) ? response.data.data[0].total_expenses: 0);
    serTotalExpensesLoading(false);
  }, []);

  //event States
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState('');
  const [eventListError, setEventListError] = useState(false);
  const [eventListLoading, setEventListLoading] = useState(true);

  //cause States
  const [causeList, setCauseList] = useState([]);
  const [causeListError, setCauseListError] = useState(false);
  const [causeListLoading, setCauseListLoading] = useState(true);

  const fetchEventData = async () => {
    const response = await axios
      .get(baseUrl + 'events?sort=-balance&limit=5&status=ongoing')
      .then(function (response) {
        //handle success
        setEventList(response.data.data);
        setEventListLoading(false);
      })
      .catch(function (response) {
        //handle error
        setError(response.message);
        setEventListError(true);
        setEventListLoading(false);
      });
  };
  useEffect(fetchEventData, []);

  const fetchCauseData = async () => {
    const response = await axios
      .get(baseUrl + 'causes?sort=-balance&limit=5&status=ongoing')
      .then(function (response) {
        //handle success
        setCauseList(response.data.data.causes);
        setCauseListLoading(false);
      })
      .catch(function (response) {
        //handle error
        setError(response.message);
        setCauseListError(true);
        setCauseListLoading(false);
      });
  };
  useEffect(fetchCauseData, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>volunteer_activism</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Volunteers</p>
              <h3 className={classes.cardTitle} style={{fontSize: '20px'}}>
                {volunteerListLoading ? (
                  <CircularProgress />
                ) : (
                  volunteerList.length
                )}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>monetization_on</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total donations</p>
              <h4 className={classes.cardTitle}>
                {donationLoading ? <CircularProgress /> : totalDonations}
              </h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>leaderboard</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Expenditure</p>
              <h3 className={classes.cardTitle} style={{fontSize: '20px'}}>
                {totalExpensesLoading ? <CircularProgress /> : totalExpenses}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>savings</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Remaining Funds</p>
              <h3 className={classes.cardTitle} style={{fontSize: '20px'}}>
                {totalExpensesLoading && donationLoading ? (
                  <CircularProgress />
                ) : (
                  totalDonations - totalExpenses
                )}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Ongoing Events</h4>
              <p className={classes.cardCategoryWhite}>
                list of ongoing events based on fund amount
              </p>
            </CardHeader>
            <CardBody>
              <TableHead>
                <TableRow>
                  {/* <TableCell>id </TableCell> */}
                  <TableCell align="center">Event Title</TableCell>
                  <TableCell align="center">Event Type</TableCell>
                  <TableCell align="center">Fund Amount</TableCell>
                  <TableCell align="center">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventListLoading ? (
                  <CircularProgress />
                ) : eventListError ? (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something bad happened —{error}
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
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">{row.balance}</TableCell>
                          <TableCell align="center">
                            {row.createdAt.slice(0, 10)}
                          </TableCell>
                        </TableRow>
                      ))
                    : '')
                )}
              </TableBody>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Ongoing Causes</h4>
              <p className={classes.cardCategoryWhite}>
                list of ongoing causes based on fund amount
              </p>
            </CardHeader>
            <CardBody>
              <TableHead>
                <TableRow>
                  {/* <TableCell>id </TableCell> */}
                  <TableCell align="center">Cause Title</TableCell>
                  <TableCell align="center">Cause Type</TableCell>
                  <TableCell align="center">Fund Amount</TableCell>
                  <TableCell align="center">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {causeListLoading ? (
                  <CircularProgress />
                ) : causeListError ? (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something bad happened —{error}
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
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.cause_type}</TableCell>
                          <TableCell align="center">{row.balance}</TableCell>
                          <TableCell align="center">
                            {row.createdAt.slice(0, 10)}
                          </TableCell>
                        </TableRow>
                      ))
                    : '')
                )}
              </TableBody>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
