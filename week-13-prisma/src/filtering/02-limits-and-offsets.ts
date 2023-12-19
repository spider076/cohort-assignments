// You can use this functionality query while working on pagination for a website


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info', 'query']
})

async function main() {
  let pagination = await prisma.post.findMany({
    take: 3,
    skip: 1
  })
  console.log(pagination);
}

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })