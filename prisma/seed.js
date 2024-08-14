import { prisma } from '../src/utils/prisma.js'

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'leonardolodi@test.com',
      password: 'test12345',
    },
  })

  console.log('User created:', user)

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      first_name: 'Test',
      last_name: 'Account',
    },
  })

  console.log('Profile created:', profile)

  const website = await prisma.website.create({
    data: {
      url: 'omniloq.com',
      userId: user.id,
    },
  })

  console.log('Website created:', website)

  const item = await prisma.item.create({
    data: {
      name: 'Omniloq account',
      email: 'leonardolodi@test.com',
      password: 'test12345',
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
      name: 'Personal',
      description: 'My general accounts',
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
