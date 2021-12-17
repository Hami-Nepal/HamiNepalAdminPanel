import {
  CAUSE_LIST_REQUEST,
  CAUSE_LIST_SUCCESS,
  CAUSE_LIST_FAIL,
  CAUSE_CREATE_REQUEST,
  CAUSE_CREATE_RESET,
  CAUSE_CREATE_FAIL,
  CAUSE_CREATE_SUCCESS,
  CAUSE_DELETE_REQUEST,
  CAUSE_DELETE_FAIL,
  CAUSE_DELETE_SUCCESS,
  CAUSE_DETAILS_REQUEST,
  CAUSE_DETAILS_SUCCESS,
  CAUSE_DETAILS_FAIL,
  CAUSE_UPDATE_REQUEST,
  CAUSE_UPDATE_SUCCESS,
  CAUSE_UPDATE_FAIL,
  CAUSE_UPDATE_RESET,
} from '../constants/causes.constants';

const initialState = {
  causeList: [],
  causeListLoading: false,
  causeListError: null,
  causeListSuccess: false,
  causeDetails: {},
  causeDetailsLoading: false,
  causeDetailsError: null,
  causeDetailsSuccess: false,
  causeDelete: {},
  causeDeleteLoading: false,
  causeDeleteError: null,
  causeDeleteSuccess: false,
  causeUpdate: {},
  causeUpdateLoading: false,
  causeUpdateError: null,
  causeUpdateSuccess: false,
  causeCreate: {},
  causeCreateLoading: false,
  causeCreateError: null,
  causeCreateSuccess: false,
};

export const causeReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CAUSE_LIST_REQUEST:
      return {
        causeListLoading: true,
        causeList: [],
        causeCount: 0,
        causeListSuccess: false,
        causeListError: null,
      };
    case CAUSE_LIST_SUCCESS:
      return {
        causeListLoading: false,
        causeList: payload.data,
        causeCount: payload.total_data,
        causeListSuccess: false,
        causeListError: null,
      };
    case CAUSE_LIST_FAIL:
      return {
        causeListLoading: false,
        causeList: [],
        causeListSuccess: false,
        causeListError: action.payload,
      };

    case CAUSE_DETAILS_REQUEST:
      return {
        causeDetailsLoading: true,
        causeDetails: {},
        causeDetailsSuccess: false,
        causeDetailsError: null,
      };
    case CAUSE_DETAILS_SUCCESS:
      return {
        causeDetailsLoading: false,
        causeDetails: action.payload,
        causeDetailsSuccess: true,
        causeDetailsError: null,
      };
    case CAUSE_DETAILS_FAIL:
      return {
        causeDetailsLoading: false,
        causeDetails: [],
        causeDetailsSuccess: false,
        causeDetailsError: action.payload,
      };
    case CAUSE_DELETE_REQUEST:
      return {
        causeDeleteLoading: true,
        causeDelete: {},
        causeDeleteSuccess: false,
        causeDeleteError: null,
      };
    case CAUSE_DELETE_SUCCESS:
      return {
        causeDeleteLoading: false,
        causeDelete: action.payload,
        causeDeleteSuccess: true,
        causeDeleteError: null,
      };
    case CAUSE_DELETE_FAIL:
      return {
        causeDeleteLoading: false,
        causeDelete: {},
        causeDeleteSuccess: false,
        causeDeleteError: action.payload,
      };

    case CAUSE_CREATE_REQUEST:
      return {
        causeCreateLoading: true,
        causeCreate: {},
        causeCreateSuccess: false,
        causeCreateError: null,
      };
    case CAUSE_CREATE_SUCCESS:
      return {
        causeCreateLoading: false,
        causeCreate: action.payload,
        causeCreateSuccess: true,
        causeCreateError: null,
      };
    case CAUSE_CREATE_FAIL:
      return {
        causeCreateLoading: false,
        causeCreate: {},
        causeCreateSuccess: false,
        causeCreateError: action.payload,
      };
    case CAUSE_CREATE_RESET:
      return {
        causeCreateLoading: false,
        causeCreate: {},
        causeCreateSuccess: false,
        causeCreateError: false,
      };

    case CAUSE_UPDATE_REQUEST:
      return state;
    case CAUSE_UPDATE_SUCCESS:
      const updatedCauseList = state.causeList.map((cause) =>
        cause._id === payload.data.cause._id ? payload.data.cause : cause,
      );
      return {
        causeListLoading: false,
        causeList: updatedCauseList,
        causeListSuccess: false,
        causeListError: null,
      };
    case CAUSE_UPDATE_FAIL:
      return {
        causeUpdateLoading: false,
        causeUpdate: {},
        causeUpdateSuccess: false,
        causeUpdateError: action.payload,
      };
    case CAUSE_UPDATE_RESET:
      return {
        causeUpdateLoading: false,
        causeUpdate: {},
        causeUpdateSuccess: false,
        causeUpdateError: false,
      };
    default:
      return state;
  }
};

export default causeReducer;
