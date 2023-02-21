import axios from 'axios'

type Method = 'login' | 'register'

interface Request {
  name?: string
  email: string
  password: string
}

export default (method: Method, req: Request) => {
  return axios
    .post('http://localhost:3000/api/v1/auth/' + method, req, {
      validateStatus: () => true,
    })
    .then((response) => response.data)
    .catch((error) => ({
      msg: error.message,
    }))
}
