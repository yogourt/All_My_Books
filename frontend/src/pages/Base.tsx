import type { ReactElement } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NavButton from '../components/NavButton'

interface Props {
  Content: ReactElement
}
function Base({ Content }: Props) {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col />
            <Col className='paddings-vert'>
              <NavButton link='../' name='back' />
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

export default Base
