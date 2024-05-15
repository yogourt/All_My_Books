import { ListGroupItem } from 'react-bootstrap'
import type { Note } from '../types'

interface Props {
  info: Note
}

function NoteListItem({ info }: Props) {
  return <ListGroupItem className='bg-book'><p className='wrap-line'>{info.content}</p></ListGroupItem>
}

export default NoteListItem
