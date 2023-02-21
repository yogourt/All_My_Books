import { useRef } from 'react'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import Book from '../components/Book'
import NewBook from '../components/NewBook'
import useBooksApi from '../hooks/useBooksApi'

export default function () {
  const [cookies] = useCookies()
  if (!cookies.token) return <div />

  const [userBooks, errorMsg, postBook] = useBooksApi()

  // new book ref
  const references = {
    title: useRef(),
    author: useRef(),
    finished: useRef(),
  }

  function saveBook() {
    const request = {
      title: references.title.current.value,
      author: references.author.current.value,
      read: references.finished.current.checked,
    }
    postBook(request)
  }

  return (
    <>
      <Row>
        <Col />
        <Col className='bg-books' sm='10' md='8'>
          <ListGroup>
            {userBooks.map((book) => (
              <Book info={book} />
            ))}
            <NewBook ref={references} />
          </ListGroup>
        </Col>
        <Col />
      </Row>

      <Row>
        <Col />
        <Col sm='10' md='8'>
          <Row>
            <Col className='margin-start'>{errorMsg}</Col>
            <Col className='text-end'>
              <Button onClick={saveBook}>Add new</Button>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </>
  )
}
