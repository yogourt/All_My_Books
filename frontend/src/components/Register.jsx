import { Button, Col, Form, Row } from 'react-bootstrap'
import { useRef, useState } from 'react'
import FormGroup from './FormGroup'
import register from '../controllers/register'
import { useCookies } from 'react-cookie'
import { options } from '../controllers/cookie'

export default function () {
  const references = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
  }

  const [serverAnswer, setServerAnswer] = useState('Please register.')
  const [_, setCookie] = useCookies()

  function sendRegistrationRequest(e) {
    e.preventDefault()
    const req = {}
    for (const [field, ref] of Object.entries(references)) {
      req[field] = ref.current.value
    }

    register(req).then((res) => {
      setServerAnswer(res.msg)
      if (res.token) {
        setCookie('token', res.token, options)
        window.location.reload(false)
      }
    })
  }

  return (
    <div className='bg-form'>
      <Row>
        <h3 className='text-center'>Registration form</h3>
      </Row>

      <Form className='margin-items' onSubmit={sendRegistrationRequest}>
        <Row>
          <FormGroup type='text' label='Username' ref={references.name} />
          <FormGroup type='email' label='Email' ref={references.email} />
          <FormGroup
            type='password'
            label='Password'
            ref={references.password}
          />
        </Row>

        <Row>
          <Col>{serverAnswer}</Col>
          <Col>
            <div className='d-grid'>
              <Button type='submit'>Register</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
