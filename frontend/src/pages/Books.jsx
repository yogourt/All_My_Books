import { useRef } from 'react'
import { ListGroup, Row, Col, Button, Container } from 'react-bootstrap'
import Book from '../components/Book'
import NewBook from '../components/NewBook'
import useBooksApi from '../hooks/useBooksApi'
import LoadingIndicator from '../components/LoadingIndicator'

function Books() {
  const { userBooks, errorMsg, postBook, isLoading } = useBooksApi()

  // new book ref
  const newBookRef = useRef()

  function saveBook() {
    const formInputs = newBookRef.current
    const request = {
      title: formInputs[0].value,
      author: formInputs[1].value,
      finished: formInputs[2].checked,
    }
    postBook(request)
  }

  return (
    <Container className='margins'>
      <Row>
        <Col />
        <Col className='bg-books' sm='10' md='8'>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <ListGroup>
              {userBooks.map((book, key) => (
                <Book key={key} info={book} />
              ))}
              <NewBook ref={newBookRef} />
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
              <Button onClick={saveBook}>Add new</Button>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default Books
