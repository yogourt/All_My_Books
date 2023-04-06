import { Col, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Book } from '../types'

interface Props {
  info: Book
}

function BookListItem({ info }: Props) {
  return (
    <ListGroupItem className='bg-book'>
      <Link to={info.id} state={info}>
        <Row className='align-items-center'>
          <Col className='margin-start'>
            <b>{info.title}</b>
          </Col>
          <Col> {info.author}</Col>
          <Col sm='4' md='2' className='small-cap-text'>
            {info.read ? 'FINISHED' : 'NOT FINISHED'}
          </Col>
        </Row>
      </Link>
    </ListGroupItem>
  )
}

export default BookListItem
