import axios from 'axios'

export default (req) =>
  axios
    .post('http://localhost:3000/api/v1/auth/login', req, {
      validateStatus: () => true,
    })
    .then((response) => response.data)
    .catch((error) => error.message)
