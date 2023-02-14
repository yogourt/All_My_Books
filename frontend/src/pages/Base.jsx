import { Container, Row, Col } from 'react-bootstrap'
import BackButton from '../components/BackButton'

export default function ({ Content }) {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col />
            <Col>
              <BackButton />
            </Col>
          </Row>
        </Col>
        <Col xs='8' md='7' lg='6' xl='5'>
          {Content}
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
