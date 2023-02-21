import axios from 'axios'
import { useState, useEffect } from 'react'
import { StatusCodes } from 'http-status-codes'

const axiosOpts = { validateStatus: () => true }
const url = 'http://localhost:3000/api/v1/books'

export default function () {
  const [data, setData] = useState([])
  const [errorMsg, setErrorMsg] = useState()

  const getUserBooks = () => {
    axios
      .get(url, axiosOpts)
      .then((response) => {
        if (response.status === StatusCodes.OK) setData(response.data)
        else setErrorMsg(response.data.msg)
      })
      .catch((error) => {
        setData([])
        setErrorMsg(error.message)
      })
  }

  const postBook = (req) => {
    axios
      .post(url, req, axiosOpts)
      .then((response) => {
        if (response.status == StatusCodes.CREATED) getUserBooks()
        else setErrorMsg(response.data.msg)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  useEffect(getUserBooks, [])

  return [data, errorMsg, postBook]
}
