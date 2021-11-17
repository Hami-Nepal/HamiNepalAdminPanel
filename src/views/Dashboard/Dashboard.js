import React, {useState, useEffect} from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
// import Store from '@material-ui/icons/Store';
// import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
// import ArrowUpward from '@material-ui/icons/ArrowUpward';
// import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Tasks from 'components/Tasks/Tasks.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
// import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import {bugs, website, server} from 'variables/general.js';
import {useDispatch, useSelector} from 'react-redux';
import {listVolunteers} from './../../store/actions/volunteers.actions';
import CircularProgress from '@material-ui/core/CircularProgress';

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from 'variables/charts.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import baseUrl from '../../api/baseUrl';
import axios from 'axios';
import {createFalse} from 'typescript';

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
    serTotalDonations(response.data.data[0].donation);
    setDonationLoading(false);
  }, []);
  useEffect(async () => {
    const response = await axios.get(baseUrl + 'find/totalExpenses', config);
    serTotalExpenses(response.data.data[0].total_expenses);
    serTotalExpensesLoading(false);
  }, []);

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
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{' '}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="danger"
            tabs={[
              {
                tabName: 'Bugs',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: 'Website',
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: 'Server',
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>what to put here???</h4>
              <p className={classes.cardCategoryWhite}>Any suggestions?</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={['1', '2', '3', '4']}
                tableData={[
                  ['1', 'Dakota Rice', '$36,738', 'Niger'],
                  ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                  ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                  ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
