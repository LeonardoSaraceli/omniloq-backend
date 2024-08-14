import { prisma } from '../utils/prisma.js'

const getAllChestsDb = async (userId) => {
  return await prisma.chest.findMany({
    where: {
      userId: userId,
    },
    include: {
      items: {
        where: {
          userId: userId,
        },
      },
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
    include: {
      items: true,
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

const addItemToChestDb = async (userId, chestId, itemId) => {
  return await prisma.chest.update({
    where: {
      userId: userId,
      id: chestId,
    },
    data: {
      items: {
        connect: {
          id: itemId,
        },
      },
    },
    include: {
      items: true,
    },
  })
}

const removeItemFromChestDb = async (userId, chestId, itemId) => {
  return await prisma.chest.update({
    where: {
      userId: userId,
      id: chestId,
    },
    data: {
      items: {
        disconnect: {
          id: itemId,
        },
      },
    },
    include: {
      items: true,
    },
  })
}

export {
  getAllChestsDb,
  createChestDb,
  getChestByIdDb,
  editChestByIdDb,
  deleteChestByIdDb,
  addItemToChestDb,
  removeItemFromChestDb,
}
