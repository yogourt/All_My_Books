import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { type FormEvent, useRef, useState } from 'react'
import FormGroup from './FormGroup'
import auth from '../controllers/auth'
import { useCookies } from 'react-cookie'
import { options } from '../controllers/cookie'

function Register() {
  const references = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  }

  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState('Please register.')
  const setCookie = useCookies()[1]

  function sendRegistrationRequest(e: FormEvent) {
    e.preventDefault()
    const email = references.email.current?.value
    const name = references.name.current?.value
    const password = references.password.current?.value

    if (!email || !name || !password) {
      setErrorMsg('Please provide email, name and password.')
      return
    }

    auth('register', { email, name, password }).then(
      (res) => {
        setErrorMsg(res.msg)
        if (res.token) {
          setCookie('token', res.token, options)
          navigate('../')
        }
      },
      () => {}
    )
  }

  return (
    <div className='bg-form'>
      <Row>
        <h3 className='text-center'>Registration form</h3>
      </Row>

      <Form className='margin-items' onSubmit={sendRegistrationRequest}>
        <Row>
          <FormGroup inputType='text' label='Username' ref={references.name} />
          <FormGroup inputType='email' label='Email' ref={references.email} />
          <FormGroup
            inputType='password'
            label='Password'
            ref={references.password}
          />
        </Row>

        <Row>
          <Col>{errorMsg}</Col>
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

export default Register
