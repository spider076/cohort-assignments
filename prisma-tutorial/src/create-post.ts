import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({log: ['info', 'query'] });

const main = async () => {
    await prisma.post.create({
        data: {
            title: "demo",
            authorId: 1,
            content: "demo description",
            published: true
        }
    })
};

main()
    .then(async () => {
        console.log("query executed succesfully !");
        await prisma.$disconnect()
    }).catch(async (err) => {
        console.log(err);
        await prisma.$disconnect()
        process.exit(1);
    });