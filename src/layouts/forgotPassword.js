import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {TextField} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {userForgotPassword} from 'store/actions/users.actions';
import {Box} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertTitle from '@material-ui/lab/AlertTitle';
import baseUrl from 'api/baseUrl';

import './forgotPassword.css';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://haminepal.org/">
        Hami Nepal Org
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
const forgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetHandler = (e) => {
    setLoading(true);
    axios({
      method: 'POST',
      url: baseUrl + 'users/forgotPassword',
      data: email,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        //handle success
        alert('Email sent successfully');
        setLoading(false);
      })
      .catch(function (response) {
        //handle error
        setError(response.message);
        setLoading(false);
      });
  };

  return (
    <div className="forgotPassword">
      <h3>Forgot password</h3>

      <div className="forgotPassword__content">
        <p>
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </p>

        <form className="forgotPassword__form">
          <label>
            <p>Email</p>
            <TextField
              id="standard-basic"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              style={{width: '80%'}}
            />
          </label>
          {loading ? (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          ) : (
            <button onClick={resetHandler}>Reset password</button>
          )}
          {error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something bad happened — <strong>{error}</strong>
              <br></br>
            </Alert>
          ) : (
            ''
          )}
        </form>

        <hr />

        <Link to="/admin/login">Remember your password?</Link>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
};

export default forgotPassword;
