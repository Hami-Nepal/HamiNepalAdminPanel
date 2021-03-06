import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
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
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
} from '../constants/users.constants';

export const userLoginReducer = (state = {}, action,
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true};
    case USER_LOGIN_SUCCESS:
      return {loading: false, userInfo: action.payload, };
    case USER_LOGIN_FAIL:
      return {loading: false, error: action.payload};
    case USER_LOGOUT:
      return {};
    case USER_CLEAR_ERROR:
      return {error: null};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {...state, loading: true};
    case USER_REGISTER_SUCCESS:
      return {...state, loading: false, userInfo: action.payload, error: null};
    case USER_REGISTER_FAIL:
      return {...state, loading: false, error: action.payload, userInfo: null};
    case USER_CLEAR_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
};


export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {...state, loading: true};
    case USER_DETAILS_SUCCESS:
      return {...state, loading: false, userInfo: action.payload, error: null};
    case USER_DETAILS_FAIL:
      return {...state, loading: false, error: action.payload, userInfo: null};
    case USER_CLEAR_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {...state, loading: true};
    case USER_UPDATE_PROFILE_SUCCESS:
      return {...state, loading: false, userInfo: action.payload, error: null};
    case USER_UPDATE_PROFILE_FAIL:
      return {...state, loading: false, error: action.payload, userInfo: null};
    case USER_CLEAR_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
};

export const userForgotPassword = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return {...state, loading: true};
    case USER_FORGOT_PASSWORD_SUCCESS:
      return {...state, loading: false, message: action.payload, error: null};
    case USER_FORGOT_PASSWORD_FAIL:
      return {...state, loading: false, error: action.payload, message: null};
    case USER_CLEAR_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
};
