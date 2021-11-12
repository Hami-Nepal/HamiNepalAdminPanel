import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { userForgotPassword } from 'store/actions/users.actions';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import './forgotPassword.css';

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

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        flexDirection: 'column',
        alignItems: 'center',
    },
}))
const forgotPassword = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const resetHandler = (e) => {
        setLoading(true)
        e.preventDefault();
        dispatch(userForgotPassword(email));
        setLoading(false)
        alert("Email sent")
    };

    return (
        <div className="forgotPassword">
            <h3>Forgot password</h3>

            <div className='forgotPassword__content'>
                <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>

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
                    
                </form>

                <hr />

                <Link to="/admin/login">Remember your password?</Link>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}

export default forgotPassword
