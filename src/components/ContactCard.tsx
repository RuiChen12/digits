/* eslint-disable react/prop-types */

'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Note } from '@prisma/client';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}

interface Props {
  contact: Contact;
  notes: Note[]; // ✅ 现在是 Date 类型的 createdAt
}

const ContactCard: React.FC<Props> = ({ contact, notes }) => (
  <Card className="h-100">
    <Card.Body>
      <div className="d-flex align-items-start">
        <Image
          src={contact.image}
          alt={`${contact.firstName} ${contact.lastName}`}
          roundedCircle
          width={75}
          height={75}
        />
        <div className="ms-3 flex-grow-1">
          <Card.Title className="mb-0">{`${contact.firstName} ${contact.lastName}`}</Card.Title>
          <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
          <hr />
          <Card.Text>{contact.description}</Card.Text>
        </div>
      </div>

      {/* ✅ Note 列表 */}
      <ListGroup variant="flush" className="mt-3">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      {/* ✅ 添加 Note 表单 */}
      <AddNoteForm contactId={contact.id} />
    </Card.Body>

    <Card.Footer>
      <Link href={`/edit-contact/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
