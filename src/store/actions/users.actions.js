import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_CLEAR_ERROR,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
} from '../constants/users.constants';

import api from 'api';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST});

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await api.post(
      'users/loginAdmin',
      {email, password},
      config,
    );

    dispatch({type: USER_LOGIN_SUCCESS, payload: data});

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  dispatch({type: USER_LOGOUT});
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({type: USER_REGISTER_REQUEST});

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await api.post(
      'users/signup',
      {
        name,
        email,
        password,
      },
      config,
    );

    dispatch({type: USER_REGISTER_SUCCESS, payload: data});
    dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({type: USER_CLEAR_ERROR});
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: USER_DETAILS_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await api.get(`/users/${id}`, config);

    dispatch({type: USER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST});

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('photo', profileData.photo);

    formData.append('province', profileData.province);
    formData.append('district', profileData.district);
    formData.append('city', profileData.city);

    const {data} = await api.patch('/users/updateMe', formData, config);

    dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({type: USER_FORGOT_PASSWORD_REQUEST});
    const {linkSent} = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await api.post('users/forgotPassword', {email}, config);

    dispatch({type: USER_FORGOT_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
