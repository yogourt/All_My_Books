import axios from 'axios'

export const postBook = (req) =>
  axios
    .post('http://localhost:3000/api/v1/books', req, {
      validateStatus: () => true,
    })
    .then((response) => response.data)
    .catch((error) => error.message)

export const handleUnauthorizedError = (cookies) => {
  cookies.remove('token')
}
