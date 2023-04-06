import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Book } from '../types'

const axiosOpts = { validateStatus: () => true }
const url = 'http://localhost:3000/api/v1/books'

export default function (): {
  book: Book | undefined
  errorMsg: string | undefined
  getBook: (id: string) => void
} {
  const navigate = useNavigate()
  const [data, setData] = useState<Book>()
  const [errorMsg, setErrorMsg] = useState<string>()

  const getBook = (id: string): void => {
    axios
      .get(`${url}/${id}`, axiosOpts)
      .then((response) => {
        if (response.status === StatusCodes.OK) setData(response.data)
        if (response.status === StatusCodes.UNAUTHORIZED) navigate('/books')
        if (response.status === StatusCodes.NOT_FOUND)
          setErrorMsg('Book was not found. ')
      })
      .catch((error) => {
        setErrorMsg(error.message)
        setData(undefined)
      })
  }

  return { book: data, errorMsg, getBook }
}
