import { useRef } from 'react'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import Book from '../components/Book'
import NewBook from '../components/NewBook'
import { postBook } from '../controllers/books'

const userBooks = [
  { title: 'Alice in Wonderland', author: 'Lewis Carroll', read: false },
  { title: 'Blackout', author: 'Marc Elsberg', read: false },
]
export default function () {
  const [cookies] = useCookies()
  if (!cookies.token) return <div />

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
      finished: references.finished.current.checked,
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
        <Col sm='10' md='8' className='text-end'>
          <Button onClick={saveBook}>Add new</Button>
        </Col>
        <Col />
      </Row>
    </>
  )
}
