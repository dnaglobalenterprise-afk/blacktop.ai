import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'dom@blacktop.local';

  // 1. We MUST create a Carrier first because your schema requires it
  const carrier = await (prisma as any).carrier.upsert({
    where: { name: 'Blacktop Logistics' },
    update: {},
    create: {
      name: 'Blacktop Logistics',
      dotNumber: '0000000',
    },
  });

  // 2. Now create the User linked to that Carrier
  await prisma.user.upsert({

  where: { email: 'dcortez5924@gmail.com' }, // e.g., 'owner@defy.com'

  update: {},

  create: {

    email: 'dcortez5924@gmail.com',

    name: 'Owner',

    password: 'March2022',

    role: UserRole.OWNER,

    carrier: {

      connect: { id: carrier.id } // connect by the upserted carrier's id

    },

  },

});

  console.log('✅ Seed complete: Carrier created and Owner linked.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });