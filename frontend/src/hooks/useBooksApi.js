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
  const [isLoading, setIsLoading] = useState(true)

  const getTokenWithErrorHandling = async () => {
    try {
      return await getToken()
    } catch (error) {
      navigate('/')
    }
  }

  const getUserBooks = async () => {
    setIsLoading(true)
    const token = await getTokenWithErrorHandling()
    if (!token) return
    axios
      .get(url, { validateStatus, headers: { Authorization: token } })
      .then((response) => {
        if (response.status === StatusCodes.OK) setData(response.data || [])
        else setErrorMsg(response.data.message)
      setIsLoading(false)
      })
      .catch((error) => {
        setData([])
        setErrorMsg(error.message)
        setIsLoading(false)
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

  return { userBooks: data, errorMsg, postBook, isLoading }
}
