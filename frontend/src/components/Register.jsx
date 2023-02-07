import { Button, Col, Form, Row } from 'react-bootstrap'
import { useRef, useState } from 'react'
import FormGroup from './FormGroup'
import register from '../controllers/register'

export default function () {
  const references = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
  }

  const [serverAnswer, setServerAnswer] = useState('Please register.')

  function sendRegistrationRequest() {
    const req = {}
    for (const [field, ref] of Object.entries(references)) {
      req[field] = ref.current.value
    }

    register(req).then((res) => setServerAnswer(res))
  }

  return (
    <div className='bg-form'>
      <Row>
        <h3 className='text-center'>Registration form</h3>
      </Row>

      <Row>
        <Form className='margin-items'>
          <FormGroup type='text' label='Username' ref={references.name} />
          <FormGroup type='email' label='Email' ref={references.email} />
          <FormGroup
            type='password'
            label='Password'
            ref={references.password}
          />
        </Form>
      </Row>

      <Row>
        <Col></Col>
        <Col>
          <div className='d-grid'>
            <Button onClick={sendRegistrationRequest}>Register</Button>
          </div>
        </Col>
      </Row>

      <Row>{serverAnswer}</Row>
    </div>
  )
}
