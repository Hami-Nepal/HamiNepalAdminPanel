import React, {useEffect, useState} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import {useTheme} from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from './styles';
import axios from 'axios';
import baseURL from 'api/baseUrl';

const useStyles = makeStyles(styles);

import {useDispatch, useSelector} from 'react-redux';
import {listDonations} from 'store/actions/donation.actions';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from 'components/CustomButtons/Button.js';
import GridContainer from 'components/Grid/GridContainer';
import {Link} from 'react-router-dom';

//Card MUI
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {red} from '@mui/material/colors';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {assertExpressionStatement} from '@babel/types';

export default function Donations() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [donationsList, setDonationsList] = useState([]);
  const [donationsCount, setDonationsCount] = useState();
  const [donationsListLoading, setDonationsListLoading] = useState(false);
  const [donationsListSuccess, setDonationsListSuccess] = useState(false);
  const [donationsListError, setDonationsListError] = useState(false);

  const fetchDataFromApi = async (page) => {
    setDonationsListLoading(true);
    try {
      await axios
        .get(baseURL + 'kinddonation?page=' + page + '&limit=9')
        .then((resp) => {
          setDonationsList(resp.data.data);
          setDonationsCount(resp.data.total_data);
          setDonationsListLoading(false);
          setDonationsListSuccess(true);
        });
    } catch (error) {
      setDonationsListLoading(false);
      setDonationsListSuccess(false);
      setDonationsListError(true);
    }
  };

  useEffect(() => {
    fetchDataFromApi(page);
  }, [page]);

  return (
    <>
      <Link to="/admin/kinddonation/create">
        <Button color="danger" type="submit">
          Add a new Kind Donation
        </Button>
      </Link>
      <h5>
        Showing Data: {donationsList.length} of {donationsCount}
      </h5>
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
            <Grid container alignItems="stretch">
              {donationsList.map((donation) => (
                <GridItem
                  xs={12}
                  sm={6}
                  md={4}
                  key={donation._id}
                  style={{marginBottom: '2rem'}}>
                  <Card style={{height: '100%'}}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                          {donation.donerType === 'Organization'
                            ? 'org'
                            : 'indv'}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <Link to={`/admin/kinddonation/edit/${donation._id}`}>
                            <ModeEditOutlineOutlinedIcon />
                          </Link>
                        </IconButton>
                      }
                      title={donation.donatedItem}
                      subheader={`Type: ${donation.category}, Quantity: ${donation.quantity}`}
                      style={{backgroundColor: 'white'}}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={donation.photos[0]}
                      alt="Item Photo"
                    />
                    <CardContent style={{backgroundColor: 'white'}}>
                      <Typography
                        variant="subtitle1"
                        style={{color: 'green', marginBottom: '1rem'}}>
                        Donated by:{donation.donerFullName}
                      </Typography>
                      <Typography variant="body2" style={{color: 'black'}}>
                        {donation.category === 'cause'
                          ? `CAUSE: ${donation.cause_name} (${donation.cause})`
                          : donation.category === 'event'
                          ? `EVENT: ${donation.event_name} (${donation.event})`
                          : `KINDNESS:${donation.kindness}`}
                      </Typography>
                      <div style={{borderBottom: '1px solid #D3D3D3'}}></div>
                      <Typography variant="body2" style={{color: 'black'}}>
                        CONTACT:{donation.phoneNumber}
                      </Typography>
                      <div style={{borderBottom: '1px solid #D3D3D3'}}></div>
                      <Typography variant="body2" style={{color: 'black'}}>
                        EMAIL:{donation.donerEmail}
                      </Typography>
                      <div style={{borderBottom: '1px solid #D3D3D3'}}></div>
                      <Typography variant="body2" style={{color: 'black'}}>
                        DATE:{donation.createdAt.slice(0, 10)}
                      </Typography>
                      <div style={{borderBottom: '1px solid #D3D3D3'}}></div>
                      <Typography variant="body2" style={{color: 'black'}}>
                        ADDRESS: {donation.city} {donation.state} (
                        {donation.country})
                      </Typography>
                    </CardContent>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          )}
          <Stack spacing={2} style={{alignItems: 'center', marginTop: '1rem'}}>
            <Pagination
              count={Math.ceil(donationsCount / 10)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </>
      ) : (
        ''
      )}
    </>
  );
}
