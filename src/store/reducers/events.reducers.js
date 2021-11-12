import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_RESET,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_RESET,
} from '../constants/events.constants';

const initialState = {
  eventList: [],
  eventListLoading: false,
  eventListError: null,
  eventListSuccess: false,
  eventDetails: {},
  eventDetailsLoading: false,
  eventDetailsError: null,
  eventDetailsSuccess: false,
  eventDelete: {},
  eventDeleteLoading: false,
  eventDeleteError: null,
  eventDeleteSuccess: false,
  eventUpdate: {},
  eventUpdateLoading: false,
  eventUpdateError: null,
  eventUpdateSuccess: false,
  eventCreate: {},
  eventCreateLoading: false,
  eventCreateError: null,
  eventCreateSuccess: false,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return {
        eventListLoading: true,
        eventList: [],
        eventListSuccess: false,
        eventListError: null,
      };
    case EVENT_LIST_SUCCESS:
      return {
        eventListLoading: false,
        eventList: action.payload,
        eventListSuccess: false,
        eventListError: null,
      };
    case EVENT_LIST_FAIL:
      return {
        eventListLoading: false,
        eventList: [],
        eventListSuccess: false,
        eventListError: action.payload,
      };

    case EVENT_DETAILS_REQUEST:
      return {
        eventDetailsLoading: true,
        eventDetails: {},
        eventDetailsSuccess: false,
        eventDetailsError: null,
      };
    case EVENT_DETAILS_SUCCESS:
      return {
        eventDetailsLoading: false,
        eventDetails: action.payload,
        eventDetailsSuccess: true,
        eventDetailsError: null,
      };
    case EVENT_DETAILS_FAIL:
      return {
        eventDetailsLoading: false,
        eventDetails: [],
        eventDetailsSuccess: false,
        eventDetailsError: action.payload,
      };
    case EVENT_DELETE_REQUEST:
      return {
        eventDeleteLoading: true,
        eventDelete: {},
        eventDeleteSuccess: false,
        eventDeleteError: null,
      };
    case EVENT_DELETE_SUCCESS:
      return {
        eventDeleteLoading: false,
        eventDelete: action.payload,
        eventDeleteSuccess: true,
        eventDeleteError: null,
      };
    case EVENT_DELETE_FAIL:
      return {
        eventDeleteLoading: false,
        eventDelete: {},
        eventDeleteSuccess: false,
        eventDeleteError: action.payload,
      };

    case EVENT_CREATE_REQUEST:
      return {
        eventCreateLoading: true,
        eventCreate: {},
        eventCreateSuccess: false,
        eventCreateError: null,
      };
    case EVENT_CREATE_SUCCESS:
      return {
        eventCreateLoading: false,
        eventCreate: action.payload,
        eventCreateSuccess: true,
        eventCreateError: null,
      };
    case EVENT_CREATE_FAIL:
      return {
        eventCreateLoading: false,
        eventCreate: {},
        eventCreateSuccess: false,
        eventCreateError: action.payload,
      };
    case EVENT_CREATE_RESET:
      return {
        eventCreateLoading: false,
        eventCreate: {},
        eventCreateSuccess: false,
        eventCreateError: false,
      };

    case EVENT_UPDATE_REQUEST:
      return {
        eventUpdateLoading: true,
        eventUpdate: {},
        eventUpdateSuccess: false,
        eventUpdateError: null,
      };
    case EVENT_UPDATE_SUCCESS:
      return {
        eventUpdateLoading: false,
        eventUpdate: action.payload,
        eventUpdateSuccess: true,
        eventUpdateError: null,
      };
    case EVENT_UPDATE_FAIL:
      return {
        eventUpdateLoading: false,
        eventUpdate: {},
        eventUpdateSuccess: false,
        eventUpdateError: action.payload,
      };
    case EVENT_UPDATE_RESET:
      return {
        eventUpdateLoading: false,
        eventUpdate: {},
        eventUpdateSuccess: false,
        eventUpdateError: false,
      };
    default:
      return state;
  }
};

export default eventReducer;
