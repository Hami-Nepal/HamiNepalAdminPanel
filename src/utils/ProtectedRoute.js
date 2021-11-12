import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, condition, redirect, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                return condition ?
                    <Component {...rest} {...props} /> :
                    <Redirect to={
                        {
                            pathname: redirect,
                            state: {
                                from: props.location,
                                message: 'You are not logged in, please login to continue.'
                            }
                        }
                    } />
            }
        } />
    )
}

export default ProtectedRoute;
