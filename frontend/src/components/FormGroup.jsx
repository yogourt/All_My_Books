import { forwardRef } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

function FormGroup(props, ref) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm='4'>
        {props.label}
      </Form.Label>
      <Col>
        <Form.Control type={props.type} ref={ref}></Form.Control>
      </Col>
    </Form.Group>
  )
}

export default forwardRef(FormGroup)
