import {
  Form,
  ListGroupItem,
  Row,
  Col,
  FormControl,
  FormCheck,
} from 'react-bootstrap'
import { useState } from 'react'
import { forwardRef } from 'react'

function NewBook(_, ref) {
  const { title, author, finished } = ref
  const [finishedState, setFinished] = useState()

  const changeFinishedLabel = (event) => {
    setFinished(event.target.checked)
  }

  return (
    <ListGroupItem className='bg-book'>
      <Form>
        <Row className='align-items-center'>
          <Col>
            <b>
              <FormControl placeholder='title' ref={title} />
            </b>
          </Col>
          <Col>
            <FormControl placeholder='author' ref={author} />
          </Col>
          <Col sm='4' md='3' lg='2'>
            <FormCheck
              onChange={changeFinishedLabel}
              label={finishedState ? 'FINISHED' : 'NOT FINISHED'}
              ref={finished}
              className='small-cap-text'
            />
          </Col>
        </Row>
      </Form>
    </ListGroupItem>
  )
}

export default forwardRef(NewBook)
