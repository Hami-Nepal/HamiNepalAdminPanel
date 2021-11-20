import {
  CAUSE_LIST_REQUEST,
  CAUSE_LIST_SUCCESS,
  CAUSE_LIST_FAIL,
  CAUSE_DETAILS_REQUEST,
  CAUSE_DETAILS_SUCCESS,
  CAUSE_DETAILS_FAIL,
  CAUSE_DELETE_REQUEST,
  CAUSE_DELETE_SUCCESS,
  CAUSE_DELETE_FAIL,
  CAUSE_CREATE_REQUEST,
  CAUSE_CREATE_SUCCESS,
  CAUSE_CREATE_FAIL,
  CAUSE_UPDATE_REQUEST,
  CAUSE_UPDATE_FAIL,
  CAUSE_UPDATE_SUCCESS,
} from '../constants/causes.constants';
import api from 'api';

export const listCauses = (page) => async (dispatch) => {
  try {
    dispatch({type: CAUSE_LIST_REQUEST});
    const {data} = await api.get(`/causes?page=${page}`);

    dispatch({
      type: CAUSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAUSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCauseDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: CAUSE_DETAILS_REQUEST});

    const {data} = await api.get(`/causes/${id}`);

    dispatch({type: CAUSE_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: CAUSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCause = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: CAUSE_DELETE_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await api.delete(`/causes/${id}`, config);

    dispatch({type: CAUSE_DELETE_SUCCESS});
  } catch (error) {
    dispatch({
      type: CAUSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCause = () => async (dispatch, getState) => {
  try {
    dispatch({type: CAUSE_CREATE_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await api.post(`/causes/`, {}, config);

    dispatch({type: CAUSE_CREATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: CAUSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCause = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({type: CAUSE_UPDATE_REQUEST});

    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const {data} = await api.put(
      'causes/' + id,
      {status: status == 'ongoing' ? 'past' : 'ongoing'},
      {headers: {Authorization: 'Bearer ' + token}},
    );

    dispatch({type: CAUSE_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: CAUSE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emptyCauseList = () => ({
  type: CAUSE_LIST_SUCCESS,
  payload: {
    causeListLoading: false,
    causeList: [],
    causeListSuccess: false,
    causeListError: null,
  },
});
