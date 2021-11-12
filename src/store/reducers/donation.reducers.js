import {
    DONATION_LIST_REQUEST,
    DONATION_LIST_SUCCESS,
    DONATION_LIST_FAIL,
} from '../constants/donations.constants';

const initialState = {
    donationsList: [],
    donationsCount: 0,
    donationsListLoading: false,
    donationsListSuccess: false,
    donationsListError: '',
}

export const donationsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DONATION_LIST_REQUEST:
            return {
                donationsList: [],
                donationsListLoading: true,
                donationsCount: 0,
                donationsListSuccess: false,
                donationsListError: '',
            };
        case DONATION_LIST_SUCCESS:
            return {
                donationsList: payload.data,
                donationsCount: payload.results,
                donationsListLoading: false,
                donationsListSuccess: true,
                donationsListError: '',
            };
        case DONATION_LIST_FAIL:
            return {
                donationsList: [],
                donationsCount: 0,
                donationsListLoading: false,
                donationsListSuccess: false,
                donationsListError: payload,
            };
        default:
            return state;
    }
};