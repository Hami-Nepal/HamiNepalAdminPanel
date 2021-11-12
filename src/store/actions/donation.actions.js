import {
    DONATION_LIST_REQUEST,
    DONATION_LIST_SUCCESS,
    DONATION_LIST_FAIL,
} from '../constants/donations.constants';

import api from 'api';

export const listDonations = (params) => async (dispatch) => {
    try {
        dispatch({ type: DONATION_LIST_REQUEST });

        const { data } = await api.get('/donations', { params });

        dispatch({ type: DONATION_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DONATION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
