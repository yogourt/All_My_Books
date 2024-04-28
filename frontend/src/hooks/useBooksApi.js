import axios from 'axios'
import { useState, useEffect } from 'react'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from './consts'
import { getToken } from '../controllers/auth'

const validateStatus = () => true

const url = `${apiUrl}/books`

export default function () {
  const [data, setData] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const navigate = useNavigate()

  const getTokenWithErrorHandling = async () => {
    try {
      return await getToken()
    } catch (error) {
      navigate('/')
    }
  }

  const getUserBooks = async () => {
    const token = await getTokenWithErrorHandling()
    if (!token) return
    axios
      .get(url, { validateStatus, headers: { Authorization: token } })
      .then((response) => {
        if (response.status === StatusCodes.OK) setData(response.data || [])
        else setErrorMsg(response.data.message)
      })
      .catch((error) => {
        setData([])
        setErrorMsg(error.message)
      })
  }

  const postBook = async (req) => {
    const token = await getTokenWithErrorHandling()
    if (!token) return
    axios
      .post(url, req, { validateStatus, headers: { Authorization: token } })
      .then((response) => {
        if (response.status === StatusCodes.CREATED) getUserBooks()
        setErrorMsg(response.data.message)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  useEffect(() => {
    getUserBooks()
  }, [])

  return { userBooks: data, errorMsg, postBook }
}
