import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function main(){
    //you will  write your prisma queries here
   const user = await prisma.user.create({
        data: {
            fullname: 'John Doe',
            email: 'john@doe.com',
            password: '123456'
        }
    })
    console.log(user)
}

main()
    .catch(e => {
        console.error(e.message)
        
    })
    .finally(async () => {
        await prisma.$disconnect()
    })