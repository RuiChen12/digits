/* eslint-disable react/prop-types */

'use client';

import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact & { id: number };
}

const ContactCard: React.FC<Props> = ({ contact }) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit-contact/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
