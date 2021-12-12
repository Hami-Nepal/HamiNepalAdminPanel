let baseURL = 'http://localhost:5000/api/v1/';

if (process.env.NODE_ENV === 'production')
  baseURL = 'https://api.haminepal.org/api/v1/';

export default baseURL;
