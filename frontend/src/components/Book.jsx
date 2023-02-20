import { Col, ListGroupItem, Row } from 'react-bootstrap'

export default function ({ info }) {
  return (
    <ListGroupItem className='bg-book'>
      <Row className='align-items-center'>
        <Col className='margin-start'>
          <b>{info.title}</b>
        </Col>
        <Col> {info.author}</Col>
        <Col sm='4' md='2' className='small-cap-text'>
          {info.read ? 'FINISHED' : 'NOT FINISHED'}
        </Col>
      </Row>
    </ListGroupItem>
  )
}
