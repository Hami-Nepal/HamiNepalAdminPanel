import React, {useEffect, useState} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import {useTheme} from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import Primary from 'components/Typography/Primary.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Info from '@material-ui/icons/Info';
import styles from './styles';

import ESEWA from 'assets/img/payment_types/esewa1.png';
import KHALTI from 'assets/img/payment_types/khalti.png';
import GOFUNDME from 'assets/img/payment_types/gofundme.png';
import PAYPAL from 'assets/img/payment_types/paypal.jpg';

const useStyles = makeStyles(styles);

import {useDispatch, useSelector} from 'react-redux';
import {listDonations} from 'store/actions/donation.actions';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {Button} from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import baseURL from 'api/baseUrl';

function getStyles(column, name, theme) {
  return {
    fontWeight:
      name.indexOf(column) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getLimitByStyles(column, name, theme) {
  return {
    fontWeight:
      name === column
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const columnNames = [
  'donation_amount',
  'first_name',
  'last_name',
  'payment_type',
  'createdAt',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Donations() {
  const classes = useStyles();

  const payment_types_images = {ESEWA, KHALTI, GOFUNDME, PAYPAL};

  const dispatch = useDispatch();

  const theme = useTheme();

  const [sortBy, setSortBy] = useState('createdAt');
  const [page, setPage] = useState(0);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    console.log(sortBy);
    fetchDataFromApi();
  };
  // const handleLimitByChange = (event) => {
  //   setLimitBy(event.target.value);
  //   fetchDataFromApi();
  // };
  // const handleIsAscendingChange = (event) => {
  //   setIsAscending(!isAscending);
  //   fetchDataFromApi();
  // };
  const {
    donationsListSuccess,
    donationsListError,
    donationsListLoading,
    donationsList,
    donationsCount,
  } = useSelector((state) => state.donations);

  // const makeParams = () => ({
  //   limit: limitBy,
  //   sort: isAscending ? sortBy : '-' + sortBy,
  //   page,
  // });

  useEffect(() => {
    if (!donationsListSuccess) {
      fetchDataFromApi();
    }
  }, []);

  const fetchDataFromApi = async () => {
    // let params = makeParams();
    dispatch(listDonations(sortBy, page));
  };

  const fetchData = () => {
    setPage(page + 1);

    fetchDataFromApi();
  };
  return (
    <>
      {donationsListError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something bad happened — <strong>Please try again later.</strong>
          <br></br>
          <br></br>
          <Button
            onClick={fetchDataFromApi}
            variant="outlined"
            color="secondary">
            Try Again
          </Button>
        </Alert>
      ) : (
        ''
      )}
      {donationsListLoading ? <CircularProgress /> : ''}

      {donationsListSuccess ? (
        <>
          <GridContainer>
            <GridItem xs={8} sm={8} md={2} lg={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  onChange={handleSortByChange}
                  input={<Input />}
                  MenuProps={MenuProps}>
                  {columnNames.map((column) => (
                    <MenuItem
                      key={column}
                      value={column}
                      style={getStyles(column, sortBy, theme)}>
                      {column}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormControlLabel
                  control={
                    <Switch
                      checked={isAscending}
                      onChange={handleIsAscendingChange}
                      name="acending"
                    />
                  }
                  label={isAscending ? 'Descending' : 'Acending'}
                /> */}
              </FormControl>
            </GridItem>
            {/* <GridItem xs={8} sm={8} md={2} lg={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="limit-label">Limit</InputLabel>
                <Select
                  labelId="limit-label"
                  id="limit"
                  value={limitBy}
                  onChange={handleLimitByChange}
                  input={<Input />}
                  MenuProps={MenuProps}>
                  <MenuItem
                    value={10}
                    style={getLimitByStyles(10, limitBy, theme)}>
                    10
                  </MenuItem>
                  <MenuItem
                    value={20}
                    style={getLimitByStyles(20, limitBy, theme)}>
                    20
                  </MenuItem>
                  <MenuItem
                    value={50}
                    style={getLimitByStyles(50, limitBy, theme)}>
                    50
                  </MenuItem>
                  <MenuItem
                    value={100}
                    style={getLimitByStyles(100, limitBy, theme)}>
                    100
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem> */}
          </GridContainer>
          {!donationsList.length ? (
            <Alert severity="info">
              <AlertTitle>No Donors Yet.</AlertTitle>
              <strong>There are no donations in our database.</strong>
              <br></br>
              <br></br>
              <Button
                onClick={fetchDataFromApi}
                variant="outlined"
                color="secondary">
                Try Again
              </Button>
            </Alert>
          ) : (
            <InfiniteScroll
              dataLength={donationsCount} //This is important field to render the next data
              next={fetchData}
              hasMore={donationsCount !== donationsList.length}
              loader={<CircularProgress />}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              className={classes.infiniteScrollComponent}>
              <Grid container alignItems="stretch">
                {donationsList.map((donation) => (
                  <GridItem xs={12} sm={6} md={4} key={donation._id}>
                    <Card style={{height: '85%'}}>
                      <CardHeader
                        style={{height: '100%'}}
                        color="success"
                        stats
                        icon>
                        <CardIcon color="success">
                          <img
                            height="20"
                            src={payment_types_images[donation.payment_type]}
                            alt={donation.payment_type}
                          />
                        </CardIcon>
                        <p className={classes.cardCategory}>{donation.type}</p>
                        {donation.is_anonymous ? (
                          <>
                            <Typography variant="h5" color="primary">
                              anonymous donor
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography variant="h5" color="primary">
                              {donation.first_name} {donation.last_name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {donation.email}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {donation.phone_number}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {donation.street_address}, {donation.city} (
                              {donation.country})
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {donation.state}
                            </Typography>
                            {/* <Typography variant="button" color="textSecondary">
                              {donation.email}
                            </Typography> */}
                          </>
                        )}
                        <h3 className={classes.cardTitle}>
                          {donation.donation_amount} <small>NPR</small>
                        </h3>
                        <Typography color="textSecondary" variant="body2">
                          {donation.donation_message}
                        </Typography>
                      </CardHeader>
                      {/* <CardFooter stats>
                        <div className={classes.stats}>
                          <Primary>
                            <Info />
                          </Primary>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            View More
                          </a>
                        </div>
                      </CardFooter> */}
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </InfiniteScroll>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
}
