const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({
    where: { id: '1' },
    update: { name: 'Owner' },
    create: {
      id: '1',
      name: 'Owner',
    },
  });

  await prisma.role.upsert({
    where: { id: '2' },
    update: { name: 'Member' },
    create: {
      id: '2',
      name: 'Member',
    },
  });

  await prisma.paymentMethod.upsert({
    where: { id: '95d3a938-4546-4329-a49a-72ebf5471ab9' },
    update: { name: 'Cash' },
    create: {
      id: '95d3a938-4546-4329-a49a-72ebf5471ab9',
      name: 'Cash',
    },
  });

  await prisma.paymentMethod.upsert({
    where: { id: '062fc8a4-31ce-4cb7-a503-75ede1656e24' },
    update: { name: 'Credit card' },
    create: {
      id: '062fc8a4-31ce-4cb7-a503-75ede1656e24',
      name: 'Credit card',
    },
  });

  console.log(`Created seed datas`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });