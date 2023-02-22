import React, { forwardRef } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

interface Props {
  label: string
  inputType: string
}

type Ref = React.ForwardedRef<HTMLInputElement>

function FormGroup(props: Props, ref: Ref) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm='4'>
        {props.label}
      </Form.Label>
      <Col>
        <Form.Control type={props.inputType} ref={ref}></Form.Control>
      </Col>
    </Form.Group>
  )
}

export default forwardRef(FormGroup)
