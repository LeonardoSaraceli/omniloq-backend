import { prisma } from '../utils/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cryptoJs from 'crypto-js'

const getUserByIdDb = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

const getUserByEmailDb = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

const createUserDb = async (first_name, last_name, email, password) => {
  return await prisma.user.create({
    data: {
      email: email,
      password: await bcrypt.hash(password, 8),
      profile: {
        create: {
          first_name: first_name,
          last_name: last_name,
        },
      },
      chests: {
        create: {
          name: 'Personal',
          description: 'My general accounts',
        },
      },
      items: {
        create: {
          name: 'Omniloq',
          email: email,
          password: cryptoJs.AES.encrypt(
            password,
            process.env.SECRET_KEY
          ).toString(),
          chests: {
            connect: {
              id: 1,
            },
          },
        },
      },
      websites: {
        create: {
          url: 'omniloq.com',
          items: {
            connect: {
              id: 1,
            },
          },
        },
      },
    },
  })
}

const verifyPasswordDb = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
}

const createTokenDb = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY)
}

const deleteUserByIdDb = async (userId) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  })
}

export {
  getUserByIdDb,
  getUserByEmailDb,
  createUserDb,
  verifyPasswordDb,
  createTokenDb,
  deleteUserByIdDb,
}
