import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import eventsReducer from './reducers/events.reducers';
import causesReducer from './reducers/causes.reducers';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './reducers/users.reducers';
import { donationsReducer } from './reducers/donation.reducers';
import { contactsReducer } from './reducers/contacts.reducers';
import { volunteersReducer } from './reducers/volunteers.reducers';

const reducer = combineReducers({
    causes: causesReducer,
    events: eventsReducer,
    contacts: contactsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    donations: donationsReducer,
    volunteers: volunteersReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: { loading: false, userInfo: userInfoFromStorage, error: null },
};

const middlewares = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
