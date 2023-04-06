import { ListGroupItem } from 'react-bootstrap'
import type { Note } from '../types'

interface Props {
  info: Note
}

function NoteListItem({ info }: Props) {
  return <ListGroupItem className='bg-book'>{info.content}</ListGroupItem>
}

export default NoteListItem
