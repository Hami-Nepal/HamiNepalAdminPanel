import React, {useEffect} from 'react';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Primary from 'components/Typography/Primary.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';
import Typography from '@material-ui/core/Typography';

import {makeStyles} from '@material-ui/core/styles';
import Info from '@material-ui/icons/Info';
import styles from './styles';

import ESEWA from 'assets/img/payment_types/esewa.png';
import KHALTI from 'assets/img/payment_types/khalti.png';
import GOFUNDME from 'assets/img/payment_types/gofundme.png';
import PAYPAL from 'assets/img/payment_types/paypal.jpg';

const useStyles = makeStyles(styles);

import {useDispatch, useSelector} from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {Button} from '@material-ui/core';
import {listContacts} from './../../store/actions/contacts.actions';

export default function Messages() {
  const classes = useStyles();

  const payment_types_images = {ESEWA, KHALTI, GOFUNDME, PAYPAL};

  const dispatch = useDispatch();

  const {
    contactsListSuccess,
    contactsListError,
    contactsListLoading,
    contactsList,
  } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (!contactsListSuccess) {
      dispatch(listContacts());
    }
  }, []);
  return (
    <>
      {contactsListError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something bad happened — <strong>Please try again later.</strong>
          <br></br>
          <br></br>
          <Button
            onClick={(e) => dispatch(listContacts())}
            variant="outlined"
            color="secondary">
            Try Again
          </Button>
        </Alert>
      ) : (
        ''
      )}
      {contactsListLoading ? <CircularProgress /> : ''}

      {contactsListSuccess ? (
        <GridContainer>
          {contactsList.contacts.map((contact) => (
            <GridItem xs={12} sm={6} md={4}>
              <Card key={contact._id}>
                <CardHeader color="success" stats icon>
                  <p className={classes.cardCategory}>{contact.type}</p>
                  <Typography variant="h5" color="primary">
                    {contact.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {contact.email}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {contact.phone}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {contact.subject}
                  </Typography>

                  <Typography color="textSecondary" variant="caption">
                    {contact.message}
                  </Typography>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Primary>
                      <Info />
                    </Primary>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      View More
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      ) : (
        ''
      )}
    </>
  );
}
