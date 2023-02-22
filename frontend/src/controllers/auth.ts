import axios from 'axios'

type Method = 'login' | 'register'

interface Request {
  name?: string
  email: string
  password: string
}

interface Response {
  msg: string
  token?: string
}

export default async (method: Method, req: Request): Promise<Response> => {
  return await axios
    .post('http://localhost:3000/api/v1/auth/' + method, req, {
      validateStatus: () => true,
    })
    .then((response) => response.data)
    .catch((error) => ({
      msg: error.message,
    }))
}
