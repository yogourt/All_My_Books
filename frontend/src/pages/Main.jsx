import { Container } from 'react-bootstrap'
import Books from './Books'
import Anonymous from './Anonymous'

function Main() {
  return (
    <Container className='margins'>
      <Anonymous /> <Books />
    </Container>
  )
}

export default Main
