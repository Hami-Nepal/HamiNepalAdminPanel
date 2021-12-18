let baseURL = 'https://haminepal-api.herokuapp.com/api/v1/';
if (process.env.NODE_ENV === 'production')
  baseURL = 'https://haminepal-api.herokuapp.com/api/v1/';

export default baseURL;
