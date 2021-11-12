import {
    VOLUNTEERS_LIST,
    VOLUNTEERS_LIST_SUCCESS,
    VOLUNTEERS_LIST_ERROR,
    VOLUNTEER_SIGN_UP_SUCCESS,
    VOLUNTEER_SIGN_UP,
    VOLUNTEER_SIGN_UP_ERROR,
    VERIFY_VOLUNTEER_SUCCESS,
    VERIFY_VOLUNTEER,
    VERIFY_VOLUNTEER_ERROR,
} from '../constants/volunteers.constants';

import VolunteerService from '../services/volunteers.service';

import makeError from 'utils/makeError';

export const listVolunteers = () => (dispatch) => {
    dispatch({ type: VOLUNTEERS_LIST });
    try {
        VolunteerService.volunteerList().then(resp => {
            dispatch({ type: VOLUNTEERS_LIST_SUCCESS, payload: resp.data });
        }, (err => {
            dispatch({
                type: VOLUNTEERS_LIST_ERROR,
                payload: err,
            });
        }))

    } catch (error) {
        dispatch({
            type: VOLUNTEERS_LIST_ERROR,
            payload: makeError(error),
        });
    }
};

export const volunteerSignUp = (volunteer) => (dispatch) => {
    dispatch({
        type: VOLUNTEER_SIGN_UP,
    });

    try {
        VolunteerService.volunteerSignUp(volunteer).then(resp => {
            dispatch({
                type: VOLUNTEER_SIGN_UP_SUCCESS,
                payload: resp.data,
            });
        }, (err => {
            dispatch({
                type: VOLUNTEER_SIGN_UP_ERROR,
                payload: err,
            });
        }))
    } catch (err) {
        dispatch({
            type: VOLUNTEER_SIGN_UP_ERROR,
            payload: makeError(err),
        });
    }
};


export const verifyVolunteer = (id) => (dispatch) => {
    dispatch({
        type: VERIFY_VOLUNTEER,
    });

    try {
        VolunteerService.verifyVolunteer(id).then(resp => {
            dispatch({
                type: VERIFY_VOLUNTEER_SUCCESS,
                payload: resp.data,
            });
        }, (err => {
            dispatch({
                type: VERIFY_VOLUNTEER_ERROR,
                payload: err,
            });
        }))
    } catch (err) {
        dispatch({
            type: VERIFY_VOLUNTEER_ERROR,
            payload: makeError(err),
        });
    }
};
