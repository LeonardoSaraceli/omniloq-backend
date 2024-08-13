import { prisma } from '../utils/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

const createUserDb = async (email, password) => {
  return await prisma.user.create({
    data: {
      email: email,
      password: await bcrypt.hash(password, 8),
    },
  })
}

const createProfileDb = async (first_name, last_name, userId) => {
  return await prisma.profile.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      userId: userId,
    },
  })
}

const createWebsiteDb = async (url, id) => {
  return await prisma.website.create({
    data: {
      url: url,
      userId: id,
    },
  })
}

const createItemDb = async (name, email, password, userId, websiteId) => {
  return await prisma.item.create({
    data: {
      name: name,
      email: email,
      password: password,
      userId: userId,
      websites: {
        connect: {
          id: websiteId,
        },
      },
    },
  })
}

const createChestDb = async (name, description, userId, itemId) => {
  return await prisma.chest.create({
    data: {
      name: name,
      description: description,
      userId: userId,
      items: {
        connect: {
          id: itemId,
        },
      },
    },
  })
}

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
}

const createTokenDb = (userId, key) => {
  return jwt.sign({ id: userId }, key)
}

const getUserByIdDb = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      profile: true,
    },
  })
}

const deleteUserByIdDb = async (id) => {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  })
}

export {
  getUserByEmail,
  createUserDb,
  createProfileDb,
  createWebsiteDb,
  createItemDb,
  createChestDb,
  comparePassword,
  createTokenDb,
  getUserByIdDb,
  deleteUserByIdDb,
}
