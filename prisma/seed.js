import { prisma } from '../src/utils/prisma'

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      password: 'Leotest24268269!',
    },
  })

  console.log('User created:', user)

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      first_name: 'Leonardo',
      last_name: 'Lodi',
    },
  })

  console.log('Profile created:', profile)

  const website = await prisma.website.create({
    data: {
      url: 'testing.com',
    },
  })

  console.log('Website created:', website)

  const item = await prisma.item.create({
    data: {
      name: 'Testing item',
      email: 'test@gmail.com',
      password: 'Leotest24268269!',
      userId: user.id,
      websites: {
        connect: {
          id: website.id,
        },
      },
    },
  })

  console.log('Item created:', item)

  const chest = await prisma.chest.create({
    data: {
      name: 'Testing chest',
      description: 'Just testing',
      userId: user.id,
      items: {
        connect: {
          id: item.id,
        },
      },
    },
  })

  console.log('Chest created:', chest)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
