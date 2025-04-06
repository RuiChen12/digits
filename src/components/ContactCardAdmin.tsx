/* eslint-disable react/prop-types */

'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';
import type { Note } from '@prisma/client';
import NoteItem from './NoteItem';

interface Props {
  contact: Contact;
  notes?: Note[]; // ✅ 符合真实数据库结构，且为可选
}

const ContactCardAdmin: React.FC<Props> = ({ contact, notes = [] }) => (
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
          <p className="blockquote-footer">{contact.owner}</p>

          {/* ✅ 安全渲染 Note 列表 */}
          <ListGroup variant="flush" className="mt-3">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </ListGroup>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
