/* eslint-disable react/prop-types, react/jsx-one-expression-per-line */

'use client';

import { ListGroup } from 'react-bootstrap';
import type { Note } from '@prisma/client';

interface Props {
  note: Note;
}

const NoteItem: React.FC<Props> = ({ note }) => (
  <ListGroup.Item>
    <p className="fw-lighter">
      {note.createdAt.toLocaleDateString('en-US')}
    </p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem; 
