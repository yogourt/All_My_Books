import { ListGroup, Row, Col, Button, ListGroupItem } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import Book from '../components/Book'

const userBooks = [
  { title: 'Alice in Wonderland', author: 'Lewis Carroll', read: false },
  { title: 'Blackout', author: 'Marc Elsberg', read: false },
]
export default function () {
  const [cookies] = useCookies()
  if (!cookies.token) return <div />
  return (
    <>
      <Row>
        <Col />
        <Col className='bg-books' sm='10' md='8'>
          <ListGroup>
            {userBooks.map((book) => (
              <Book info={book} />
            ))}
          </ListGroup>
        </Col>
        <Col />
      </Row>

      <Row>
        <Col />
        <Col sm='10' md='8' className='text-end'>
          <Button>Add new</Button>
        </Col>
        <Col />
      </Row>
    </>
  )
}
