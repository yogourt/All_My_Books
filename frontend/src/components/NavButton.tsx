import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface Props {
  link: string
  name: string
}

function NavButton(props: Props) {
  return (
    <Link to={props.link}>
      <div className='d-grid'>
        <Button>{props.name}</Button>
      </div>
    </Link>
  )
}

export default NavButton
