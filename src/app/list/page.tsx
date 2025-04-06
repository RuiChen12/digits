'use server';

import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import type { Note } from '@prisma/client'; // ✅ 确保 Note 类型匹配

const ListPage = async () => {
  const session = await getServerSession(authOptions);

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const userEmail = session.user.email;

  // ✅ 获取联系人
  const contacts = await prisma.contact.findMany({
    where: { owner: userEmail },
  });

  // ✅ 获取笔记（并显式声明为 Note[] 类型）
  const notes: Note[] = await prisma.note.findMany({
    where: { owner: userEmail },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.id}`}>
                  <ContactCard
                    contact={contact}
                    notes={notes.filter((note) => note.contactId === contact.id)}
                  />
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
