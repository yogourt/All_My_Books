import { Col, Row } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import ExpandedButton from '../components/NavButton'

function Anonymous() {
  const [cookies] = useCookies()
  if (cookies.token) return <div />
  return (
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
  )
}

export default Anonymous
