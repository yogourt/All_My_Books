import axios from 'axios'
import { useState, useEffect } from 'react'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from './consts'

const axiosOpts = { validateStatus: () => true }

const url = `${apiUrl}/books`

export default function () {
  const [data, setData] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const navigate = useNavigate()

  const getUserBooks = () => {
    axios
      .get(url, axiosOpts)
      .then((response) => {
        if (response.status === StatusCodes.OK) setData(response.data)
        // if (response.status === StatusCodes.UNAUTHORIZED)
        else setErrorMsg(response.data.message)
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
        if (response.status === StatusCodes.CREATED) getUserBooks()
        if (response.status === StatusCodes.UNAUTHORIZED) navigate('/')
        else setErrorMsg(response.data.msg)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  useEffect(getUserBooks, [])

  return { userBooks: data, errorMsg, postBook }
}
