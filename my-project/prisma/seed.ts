import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@gmail.com',
      password: '12345678',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
