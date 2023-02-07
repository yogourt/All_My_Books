import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Register from './components/Register'

export default function App() {
  return (
    <Container>
      <Row>
        <Col />
        <Col sm='6'>
          <Register />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

function Button() {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }
  return <button onClick={handleClick}>Like {likes}</button>
}
