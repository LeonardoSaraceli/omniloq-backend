import { prisma } from '../utils/prisma.js'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

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
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
      profile: {
        create: {
          first_name: first_name,
          last_name: last_name,
        },
      },
    },
  })
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

const createPasswordTokenDb = (userId) => {
  return jwt.sign(
    { id: userId, type: 'password_view' },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  )
}

export {
  getUserByIdDb,
  getUserByEmailDb,
  createUserDb,
  createTokenDb,
  deleteUserByIdDb,
  createPasswordTokenDb,
}
