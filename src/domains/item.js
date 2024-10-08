import { prisma } from '../utils/prisma.js'
import CryptoJS from 'crypto-js'

const getAllItemsDb = async (userId) => {
  return await prisma.item.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      chests: true,
    },
  })
}

const createItemDb = async (userId, name, email, username, password) => {
  return await prisma.item.create({
    data: {
      userId: userId,
      name: name,
      email: email,
      username: username,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    },
  })
}

const getItemByIdDb = async (userId, itemId) => {
  return await prisma.item.findFirst({
    where: {
      userId: userId,
      id: itemId,
    },
    include: {
      websites: true,
      chests: true,
    },
  })
}

const favoriteOrUnfavoriteItemByIdDb = async (userId, itemId, state) => {
  return prisma.item.update({
    where: {
      userId: userId,
      id: itemId,
    },
    data: {
      favourite: state,
    },
    include: {
      websites: true,
    },
  })
}

const editItemByIdDb = async (
  userId,
  itemId,
  name,
  email,
  username,
  password
) => {
  return await prisma.item.update({
    where: {
      userId: userId,
      id: itemId,
    },
    data: {
      name: name,
      email: email,
      username: username,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    },
  })
}

const deleteItemByIdDb = async (userId, itemId) => {
  return await prisma.item.delete({
    where: {
      userId: userId,
      id: itemId,
    },
  })
}

const showOrHidePasswordByIdDb = async (userId, itemId, state) => {
  return prisma.item.update({
    where: {
      userId: userId,
      id: itemId,
    },
    data: {
      show_password: state,
    },
  })
}

export {
  getAllItemsDb,
  createItemDb,
  getItemByIdDb,
  favoriteOrUnfavoriteItemByIdDb,
  editItemByIdDb,
  deleteItemByIdDb,
  showOrHidePasswordByIdDb,
}
