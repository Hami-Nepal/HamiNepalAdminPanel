import api from 'api';

const POST_VOLUNTEER_URL = '/volunteers';
const GET_VOLUNTEER_URL = '/volunteers';
const GET_VERIFY_VOLUNTEER = '/volunteers/verify/';

const volunteerSignUp = (volunteer) => {
  return api.post(POST_VOLUNTEER_URL, {
    ...volunteer,
  });
};

const volunteerList = (page) => {
  return api.get(GET_VOLUNTEER_URL + '?page=' + page);
};

const verifyVolunteer = (id) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;

  return api.put(
    GET_VERIFY_VOLUNTEER + id,
    {},
    {
      headers: {Authorization: 'Bearer ' + token},
    },
  );
};

export default {
  volunteerSignUp,
  volunteerList,
  verifyVolunteer,
};
