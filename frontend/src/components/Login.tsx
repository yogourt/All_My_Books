import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { type FormEvent, useRef, useState } from 'react'
import FormGroup from './FormGroup'
import auth from '../controllers/auth'
import { useCookies } from 'react-cookie'
import { options } from '../controllers/cookie'

function Login() {
  const references = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  }

  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState('Please login.')
  const setCookie = useCookies()[1]

  function sendLoginRequest(e: FormEvent) {
    e.preventDefault()
    const email = references.email.current?.value
    const password = references.password.current?.value

    if (!email || !password) {
      setErrorMsg('Please provide email and password.')
      return
    }

    auth('login', { email, password }).then(
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
        <h3 className='text-center'>Login form</h3>
      </Row>

      <Form className='margin-items' onSubmit={sendLoginRequest}>
        <Row>
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
              <Button type='submit'>Login</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Login
