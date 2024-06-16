import { useEffect, useRef } from 'react'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ErrorPage from './Error'
import useNotesApi from '../hooks/useNotesApi'
import Note from '../components/Note'
import NewNote from '../components/NewNote'
import { type Book } from '../types'
import useBookApi from '../hooks/useBookApi'
import LoadingIndicator from '../components/LoadingIndicator'

function BookDetails() {
  const { author, title } = useParams()
  const { state } = useLocation()
  if (!author || !title) return <ErrorPage />
  const bookId = `${author}/${title}`

  const { book, errorMsg: bookErrorMsg, getBook } = useBookApi()
  const { notes, errorMsg, postNote, updateNote, isLoading } =
    useNotesApi(bookId)

  useEffect(() => {
    const invalidProps = !state?.title || !state?.author
    if (invalidProps) void getBook(bookId)
  }, [])

  // new note ref
  const newNoteRef = useRef<HTMLFormElement | null>(null)

  function saveNote() {
    const formInputs = newNoteRef?.current
    if (formInputs && bookId) {
      const request = {
        content: (formInputs[0] as HTMLInputElement).value,
        bookId,
      }
      void postNote(request)
    }
  }

  return bookErrorMsg ? (
    <ErrorPage msg={bookErrorMsg} />
  ) : (
    <Container className='margins'>
      <Row>
        <Col />
        <Col sm='10' md='8'>
          <Row>
            <Col className='margin-start'>
              <b>{book?.title ?? state?.title}</b>
            </Col>
            <Col> {book?.author ?? state?.author}</Col>
          </Row>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col className='bg-books' sm='10' md='8'>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <ListGroup>
              {notes.map((note, key) => (
                <Note key={key} info={note} updateNote={updateNote} />
              ))}
              <NewNote ref={newNoteRef} />
            </ListGroup>
          )}
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col sm='10' md='8'>
          <Row>
            <Col className='margin-start'>{errorMsg}</Col>
            <Col className='text-end'>
              <Button onClick={saveNote}>Add new</Button>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default BookDetails
