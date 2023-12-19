import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here
    await prisma.user.create({
        data: {
            email: "saad@gmail.com",
            name: "saad",
    }})
}

main()
    .then(async () => {
        console.log("query succesfully executed !");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })