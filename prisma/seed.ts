import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Add the base borrowal statuses
    await prisma.customerBorrowalStatuses.upsert({ where: { id: 1 }, update: {}, create: { id: 1, name: 'borrowed' } });
    await prisma.customerBorrowalStatuses.upsert({ where: { id: 2 }, update: {}, create: { id: 2, name: 'returned' } });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})
