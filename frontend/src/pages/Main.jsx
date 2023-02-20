import { Container } from 'react-bootstrap'
import Books from './Books'
import Anonymous from './Anonymous'

export default function () {
  return (
    <Container className='margins'>
      <Anonymous /> <Books />
    </Container>
  )
}
