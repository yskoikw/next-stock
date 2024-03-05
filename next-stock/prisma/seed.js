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