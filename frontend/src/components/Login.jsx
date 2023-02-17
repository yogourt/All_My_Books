import { Button, Col, Form, Row } from 'react-bootstrap'
import { useRef, useState } from 'react'
import FormGroup from './FormGroup'
import login from '../controllers/login'
import { useCookies } from 'react-cookie'
import { options } from '../controllers/cookie'

export default function () {
  const references = {
    email: useRef(),
    password: useRef(),
  }

  const [serverAnswer, setServerAnswer] = useState('Please login.')
  const [_, setCookie] = useCookies('token')

  function sendLoginRequest(e) {
    e.preventDefault()
    const req = {}
    for (const [field, ref] of Object.entries(references)) {
      req[field] = ref.current.value
    }

    login(req).then((res) => {
      setServerAnswer(res.msg)
      if (res.token) {
        setCookie('token', res.token, options)
      }
    })
  }

  return (
    <div className='bg-form'>
      <Row>
        <h3 className='text-center'>Login form</h3>
      </Row>

      <Form className='margin-items' onSubmit={sendLoginRequest}>
        <Row>
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
              <Button type='submit'>Login</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
