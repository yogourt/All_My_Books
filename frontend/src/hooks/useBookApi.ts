import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Book } from '../types'
import { apiUrl } from './consts'
import { getToken } from '../controllers/auth'

const validateStatus = (): true => true
const url = `${apiUrl}/books`

export default function (): {
  book: Book | undefined
  errorMsg: string | undefined
  getBook: (id: string) => Promise<void>
} {
  const navigate = useNavigate()
  const [data, setData] = useState<Book>()
  const [errorMsg, setErrorMsg] = useState<string>()

  const getTokenWithErrorHandling = async (): Promise<string | undefined> => {
    try {
      return await getToken()
    } catch (error) {
      navigate('/books')
    }
  }

  const getBook = async (id: string): Promise<void> => {
    const token = await getTokenWithErrorHandling()
    if (!token) return
    const headers = { Authorization: token }
    axios
      .get(`${url}/${id}`, { validateStatus, headers })
      .then((response) => {
        if (response.status === StatusCodes.OK) setData(response.data)
        if (response.status === StatusCodes.NOT_FOUND)
          setErrorMsg('Book was not found. ')
        else setErrorMsg('Unknown error')
      })
      .catch((error) => {
        setErrorMsg(error.message)
        setData(undefined)
      })
  }

  return { book: data, errorMsg, getBook }
}
