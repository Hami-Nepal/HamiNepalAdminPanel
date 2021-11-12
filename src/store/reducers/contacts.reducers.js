import {
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
} from '../constants/contacts.constants';

const initialState = {
  contactsList: {},
  contactsListLoading: false,
  contactsListSuccess: false,
  contactsListError: '',
};

export const contactsReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CONTACT_LIST_REQUEST:
      return {
        contactsList: {},
        contactsListLoading: true,
        contactsListSuccess: false,
        contactsListError: '',
      };
    case CONTACT_LIST_SUCCESS:
      return {
        contactsList: payload,
        contactsListLoading: false,
        contactsListSuccess: true,
        contactsListError: '',
      };
    case CONTACT_LIST_FAIL:
      return {
        contactsList: {},
        contactsListLoading: false,
        contactsListSuccess: false,
        contactsListError: payload,
      };
    default:
      return state;
  }
};
