import {
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
} from '../constants/contacts.constants';

import api from 'api';
import axios from 'axios';
import baseUrl from 'api/baseUrl';

export const listContacts = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  try {
    dispatch({type: CONTACT_LIST_REQUEST});

    const {data} = await axios({
      method: 'GET',
      url: baseUrl + 'contacts',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });

    dispatch({type: CONTACT_LIST_SUCCESS, payload: data.data});
  } catch (error) {
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
