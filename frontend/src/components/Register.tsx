import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useRef, useState } from 'react'
import FormGroup from './FormGroup'
import auth from '../controllers/auth'
import { useCookies } from 'react-cookie'
import { options } from '../controllers/cookie'

export default function () {
  const references = {
    name: useRef<HTMLInputElement>(),
    email: useRef<HTMLInputElement>(),
    password: useRef<HTMLInputElement>(),
  }

  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState('Please register.')
  const [_, setCookie] = useCookies()

  function sendRegistrationRequest(e: FormEvent) {
    e.preventDefault()
    const email = references.email.current?.value
    const name = references.name.current?.value
    const password = references.password.current?.value

    if (!email|| !name || !password) {
      console.log(email)
      setErrorMsg('Please provide email, name and password.')
      return
    }

    auth('register',{email, name, password}).then((res) => {
      setErrorMsg(res.msg)
      if (res.token) {
        setCookie('token', res.token, options)
        navigate('../')
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
