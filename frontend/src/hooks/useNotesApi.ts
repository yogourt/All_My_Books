import axios from 'axios'
import { useState, useEffect } from 'react'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router-dom'
import type { Note } from '../types'
import { apiUrl } from './consts'
import { getToken } from '../controllers/auth'

const validateStatus = (): true => true

const validateResp = (data: unknown): boolean => {
  if (!Array.isArray(data)) return false
  return data.find((item) => item.content)
}

export default function (bookId: string): {
  notes: Note[]
  errorMsg: string | undefined
  postNote: (req: Note) => Promise<void>
} {
  const url = `${apiUrl}/books/${bookId}/notes`
  const [data, setData] = useState<Note[]>([])
  const [errorMsg, setErrorMsg] = useState()
  const navigate = useNavigate()

  const getTokenWithErrorHandling = async (): Promise<string | undefined> => {
    try {
      return await getToken()
    } catch (error) {
      navigate('/books')
    }
  }

  const getNotes = async (): Promise<void> => {
    const token = await getTokenWithErrorHandling()
    if (!token) return

    axios
      .get(url, { validateStatus, headers: { Authorization: token } })
      .then((response) => {
        if (response.status === StatusCodes.OK && validateResp(response.data))
          setData(response.data)
        else setErrorMsg(response.data.message)
      })
      .catch((error) => {
        setData([])
        setErrorMsg(error.message)
      })
  }

  const postNote = async (req: Note): Promise<void> => {
    const token = await getTokenWithErrorHandling()
    if (!token) return
    axios
      .post(url, req, { validateStatus, headers: { Authorization: token } })
      .then((response) => {
        if (response.status === StatusCodes.CREATED) void getNotes()
        else setErrorMsg(response.data.msg)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  useEffect(() => {
    void getNotes()
  }, [])

  return { notes: data, errorMsg, postNote }
}
