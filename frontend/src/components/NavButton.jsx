import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function (props) {
  return (
    <Link to={props.link}>
      <div className='d-grid'>
        <Button>{props.name}</Button>
      </div>
    </Link>
  )
}
