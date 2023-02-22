import {
  Form,
  ListGroupItem,
  Row,
  Col,
  FormControl,
  FormCheck,
} from 'react-bootstrap'
import { type ChangeEvent, useState, forwardRef } from 'react'

function NewBook(_: unknown, ref: React.ForwardedRef<HTMLFormElement>) {
  const [finishedState, setFinished] = useState(false)

  const changeFinishedLabel = (event: ChangeEvent<HTMLInputElement>) => {
    setFinished(event.target.checked)
  }

  return (
    <ListGroupItem className='bg-book'>
      <Form ref={ref}>
        <Row className='align-items-center'>
          <Col>
            <b>
              <FormControl placeholder='title' />
            </b>
          </Col>
          <Col>
            <FormControl placeholder='author' />
          </Col>
          <Col sm='4' md='3' lg='2'>
            <FormCheck
              onChange={changeFinishedLabel}
              label={finishedState ? 'FINISHED' : 'NOT FINISHED'}
              className='small-cap-text'
            />
          </Col>
        </Row>
      </Form>
    </ListGroupItem>
  )
}

export default forwardRef(NewBook)
