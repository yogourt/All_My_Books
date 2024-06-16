import {
  Col,
  Container,
  ListGroupItem,
  Row,
  Button,
  FormControl,
} from 'react-bootstrap'
import type { Note } from '../types'
import { AiFillEdit } from 'react-icons/ai'
import { useState } from 'react'
import NewNote from './NewNote'

interface Props {
  info: Note
  updateNote: (note: Note) => Promise<void>
}

function NoteListItem({ info, updateNote }: Props) {
  const [inEdition, setInEdition] = useState(false)
  const [currentNote, setCurrentNote] = useState(info.content)
  const [editedNote, setEditedNote] = useState(info.content)

  const EditNote = (
    <FormControl
      value={editedNote}
      onChange={(e) => {
        setEditedNote(e.target.value)
      }}
      placeholder='New note'
      as='textarea'
      rows={(editedNote.match(/\n/g)?.length ?? 2) + 1}
    />
  )

  const saveEditedNote = () => {
    setInEdition(false)
    if (editedNote === currentNote) return
    setCurrentNote(editedNote)
    void updateNote({ ...info, content: editedNote })
  }

  return (
    <ListGroupItem className='bg-book'>
      <Container>
        <Row>
          <Col xs={11}>
            <p className='wrap-line'>{inEdition ? EditNote : currentNote}</p>
          </Col>
          <Col style={{ textAlign: 'end' }}>
            <Button variant='link'>
              <AiFillEdit
                onClick={() => {
                  inEdition ? saveEditedNote() : setInEdition(true)
                }}
              />
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  )
}

export default NoteListItem
