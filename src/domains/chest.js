import { prisma } from '../utils/prisma.js'

const getAllChestsDb = async (userId) => {
  return await prisma.chest.findMany({
    where: {
      userId: userId,
    },
  })
}

const createChestDb = async (userId, name, description) => {
  return await prisma.chest.create({
    data: {
      userId: userId,
      name: name,
      description: description,
    },
  })
}

const getChestByIdDb = async (userId, chestId) => {
  return await prisma.chest.findFirst({
    where: {
      userId: userId,
      id: chestId,
    },
  })
}

const editChestByIdDb = async (userId, chestId, name, description) => {
  return await prisma.chest.update({
    where: {
      userId: userId,
      id: chestId,
    },
    data: {
      name: name,
      description: description,
    },
  })
}

const deleteChestByIdDb = async (userId, chestId) => {
  return await prisma.chest.delete({
    where: {
      userId: userId,
      id: chestId,
    },
  })
}

export {
  getAllChestsDb,
  createChestDb,
  getChestByIdDb,
  editChestByIdDb,
  deleteChestByIdDb,
}
