import { useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ExpandedButton from '../components/NavButton'

function Main() {
  const navigate = useNavigate()

  const hasToken = localStorage.getItem('idToken')
  useEffect(() => (hasToken ? navigate('/books') : undefined))

  return !hasToken ? (
    <Container className='margins'>
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
  ) : (
    <div />
  )
}

export default Main
