import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Seed Users
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  // Seed Stuff
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'fair';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else {
      condition = 'good';
    }

    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });

  // ✅ Seed Contacts using forEach instead of for...of
  config.defaultContacts.forEach(async (contact, index) => {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
    await prisma.contact.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
