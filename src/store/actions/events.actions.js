import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_SUCCESS,
} from '../constants/events.constants';
import api from 'api';

export const listEvents = () => async (dispatch) => {
  try {
    dispatch({type: EVENT_LIST_REQUEST});

    const {data} = await api.get('/events');

    dispatch({type: EVENT_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: EVENT_DETAILS_REQUEST});

    const {data} = await api.get(`/events/${id}`);

    dispatch({type: EVENT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: EVENT_DELETE_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await api.delete(`/events/${id}`, config);

    dispatch({type: EVENT_DELETE_SUCCESS});
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEvent = (formData) => async (dispatch, getState) => {
  try {
    dispatch({type: EVENT_CREATE_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await api.post(`/events/`, formData, config);

    dispatch({type: EVENT_CREATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEvent = (event) => async (dispatch, getState) => {
  try {
    dispatch({type: EVENT_UPDATE_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await api.patch(`/events/${event._id}`, event, config);

    dispatch({type: EVENT_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
