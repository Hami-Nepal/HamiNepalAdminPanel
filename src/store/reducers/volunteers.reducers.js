import {
  VOLUNTEERS_LIST,
  VOLUNTEERS_LIST_SUCCESS,
  VOLUNTEERS_LIST_ERROR,
  VOLUNTEER_SIGN_UP,
  VOLUNTEER_SIGN_UP_SUCCESS,
  VOLUNTEER_SIGN_UP_ERROR,
  VERIFY_VOLUNTEER,
  VERIFY_VOLUNTEER_SUCCESS,
  VERIFY_VOLUNTEER_ERROR,
} from '../constants/volunteers.constants';

const initialState = {
  volunteerList: [],
  volunteerCount: 0,
  volunteerListLoading: false,
  volunteerListSuccess: false,
  volunteerListError: '',
  volunteerSignUpSuccess: false,
  volunteerSignUpLoading: false,
  volunteerSignUpError: '',
  volunteerSignUpData: {},
  verifyVolunteerSuccess: false,
  verifyVolunteerLoading: false,
  verifyVolunteerError: '',
};

export const volunteersReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case VOLUNTEERS_LIST:
      return {
        ...state,
        volunteerList: [],
        volunteerListLoading: true,
        volunteerCount: 0,
        volunteerListSuccess: false,
        volunteerListError: '',
      };
    case VOLUNTEERS_LIST_SUCCESS:
      return {
        ...state,
        volunteerList: payload.data,
        volunteerCount: payload.total_data,
        volunteerListLoading: false,
        volunteerListSuccess: true,
        volunteerListError: '',
      };
    case VOLUNTEERS_LIST_ERROR:
      return {
        ...state,
        volunteerList: [],
        volunteerCount: 0,
        volunteerListLoading: false,
        volunteerListSuccess: false,
        volunteerListError: payload,
      };
    case VOLUNTEER_SIGN_UP:
      return {
        ...state,
        volunteerSignUpSuccess: false,
        volunteerSignUpLoading: true,
        volunteerSignUpError: '',
        volunteerSignUpData: {},
      };
    case VOLUNTEER_SIGN_UP_SUCCESS:
      return {
        ...state,
        volunteerSignUpSuccess: true,
        volunteerSignUpLoading: false,
        volunteerSignUpError: '',
        volunteerSignUpData: payload.data,
      };
    case VOLUNTEER_SIGN_UP_ERROR:
      return {
        ...state,
        volunteerSignUpSuccess: false,
        volunteerSignUpLoading: false,
        volunteerSignUpError: payload,
        volunteerSignUpData: {},
      };
    case VERIFY_VOLUNTEER:
      return {
        ...state,
        verifyVolunteerSuccess: false,
        verifyVolunteerLoading: true,
        verifyVolunteerError: '',
      };
    case VERIFY_VOLUNTEER_SUCCESS:
      const updatedVolunteerList = state.volunteerList.map((volunteer) =>
        volunteer._id === payload.data._id ? payload.data : volunteer,
      );
      return {
        ...state,
        verifyVolunteerSuccess: true,
        verifyVolunteerLoading: false,
        verifyVolunteerError: '',
        volunteerList: updatedVolunteerList,

        // [
        //   ...state.volunteerList.map((volunteer) => {
        //     let v = volunteer;
        //     v.isVerified =
        //       v._id === payload.data.volunteer._id
        //         ? payload.data.volunteer.isVerified
        //         : v.isVerified;

        //     return v;
        //   }),
        // ],
      };
    case VERIFY_VOLUNTEER_ERROR:
      return {
        ...state,
        verifyVolunteerSuccess: false,
        verifyVolunteerLoading: false,
        verifyVolunteerError: payload.data,
      };
    default:
      return state;
  }
};
