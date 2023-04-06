import { Form, ListGroupItem, FormControl } from 'react-bootstrap'
import { forwardRef } from 'react'

function NewNote(_: unknown, ref: React.ForwardedRef<HTMLFormElement>) {
  return (
    <ListGroupItem className='bg-book'>
      <Form ref={ref}>
        <FormControl placeholder='New note' as='textarea' rows={3} />
      </Form>
    </ListGroupItem>
  )
}

export default forwardRef(NewNote)
