import { Col, ListGroupItem, Row } from 'react-bootstrap'

export default function Book({ info }) {
  return (
    <ListGroupItem className='bg-book'>
      <Row className='align-items-center'>
        <Col>
          <b>{info.title}</b>
        </Col>
        <Col> {info.author}</Col>
        <Col className='small-cap-text'>
          {info.read ? 'FINISHED' : 'NOT FINISHED'}
        </Col>
      </Row>
    </ListGroupItem>
  )
}
