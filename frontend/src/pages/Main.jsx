import { Col, Container, Row } from 'react-bootstrap'
import ExpandedButton from '../components/NavButton'

export default function () {
  return (
    <Container className='margins '>
      <Row>
        <Col />
        <Col>
          <ExpandedButton link='/login' name='Login' />
        </Col>
        <Col>
          <ExpandedButton link='/register' name='Register' />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
