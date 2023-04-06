import { Container, Row } from 'react-bootstrap'

interface Props {
  msg?: string
}
function ErrorPage({ msg }: Props) {
  return (
    <Container className='margins'>
      <Row>{msg ?? 'An error occurred.'} </Row>
    </Container>
  )
}

export default ErrorPage
