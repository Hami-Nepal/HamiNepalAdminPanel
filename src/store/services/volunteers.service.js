import api from "api";

const POST_VOLUNTEER_URL = "/volunteers";
const GET_VOLUNTEER_URL = "/volunteers";
const GET_VERIFY_VOLUNTEER = "/volunteers/verify";

const volunteerSignUp = (volunteer) => {
    return api.post(POST_VOLUNTEER_URL, {
        ...volunteer
    });
};

const volunteerList = () => {
    return api.get(GET_VOLUNTEER_URL);
};

const verifyVolunteer = (id) => {
    return api.get(GET_VERIFY_VOLUNTEER, {
        params: {
            id
        }
    });
};

export default {
    volunteerSignUp,
    volunteerList,
    verifyVolunteer
}