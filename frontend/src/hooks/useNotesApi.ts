import axios from 'axios'
import { useState, useEffect } from 'react'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router-dom'
import type { Note } from '../types'
import { apiUrl } from './consts'

const axiosOpts = { validateStatus: () => true }

const validateResp = (data: unknown): boolean => {
  if (!Array.isArray(data)) return false
  return data.find((item) => item.content)
}

export default function (bookId: string): {
  notes: Note[]
  errorMsg: string | undefined
  postNote: (req: Note) => void
} {
  const url = `${apiUrl}/books/${bookId}/notes`
  const [data, setData] = useState<Note[]>([])
  const [errorMsg, setErrorMsg] = useState()
  const navigate = useNavigate()

  const getNotes = (): void => {
    axios
      .get(url, axiosOpts)
      .then((response) => {
        if (response.status === StatusCodes.OK && validateResp(response.data))
          setData(response.data)
        // if (response.status === StatusCodes.UNAUTHORIZED) navigate('/')
        else setErrorMsg(response.data.message)
      })
      .catch((error) => {
        setData([])
        setErrorMsg(error.message)
      })
  }

  const postNote = (req: Note): void => {
    axios
      .post(url, req, axiosOpts)
      .then((response) => {
        if (response.status === StatusCodes.CREATED) getNotes()
        if (response.status === StatusCodes.UNAUTHORIZED) navigate('/')
        else setErrorMsg(response.data.msg)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  useEffect(getNotes, [])

  return { notes: data, errorMsg, postNote }
}
