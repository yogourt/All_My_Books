import { useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import ExpandedButton from '../components/NavButton'

function Main() {
  const [cookies] = useCookies()
  const navigate = useNavigate()

  useEffect(() => (cookies.token ? navigate('/books') : undefined))

  return !cookies.token ? (
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
