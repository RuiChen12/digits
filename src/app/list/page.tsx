'use server';

import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { Contact } from '@/lib/validationSchemas';
import ContactCard from '@/components/ContactCard';

const ListPage = async () => {
  const session = await getServerSession(authOptions);

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  if (!session || !session.user || !session.user.email) {
    throw new Error('Not authenticated');
  }

  const userEmail = session.user.email;

  const contacts = (await prisma.contact.findMany({
    where: {
      owner: userEmail,
    },
  })) as Contact[];

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.firstName}-${contact.lastName}`}>
                  <ContactCard contact={contact} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
