const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const sampleOrg = await prisma.Organization.create({
    data: {
      name: 'abc inc',
      phone: '12345678',
    },
  });
  console.log(`Created Organaizations`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });