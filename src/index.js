import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from 'layouts/Admin.js';
import ProtectedRoute from 'utils/ProtectedRoute.js';

import 'assets/css/material-dashboard-react.css?v=1.10.0';

import { Provider } from 'react-redux';
import store from 'store/store.js';
import Login from './layouts/LoginScreen';
import Register from './layouts/RegisterScreen';
import ForgotPassword from 'layouts/forgotPassword';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <ProtectedRoute
                    condition={localStorage.getItem('userInfo') !== null}
                    path="/admin"
                    component={Admin}
                />
                <Route path="/login" component={Login} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/register" component={Register} />

                <Redirect from="*" to="/login" />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root'),
);
import forgotPassword from 'layouts/forgotPassword';
