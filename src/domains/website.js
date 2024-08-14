import { prisma } from "../utils/prisma.js"

const getAllWebsitesDb = async (userId) => {
  return await prisma.website.findMany({
    where: {
      userId: userId,
    },
  })
}

const createWebsiteDb = async (userId, url) => {
  return await prisma.website.create({
    data: {
      userId: userId,
      url: url,
    },
  })
}

const getWebsiteByIdDb = async (userId, websiteId) => {
  return await prisma.website.findFirst({
    where: {
      userId: userId,
      id: websiteId,
    },
  })
}

const deleteWebsiteByIdDb = async (userId, websiteId) => {
  return await prisma.website.delete({
    where: {
      userId: userId,
      id: websiteId,
    },
  })
}

export {
  getAllWebsitesDb,
  createWebsiteDb,
  getWebsiteByIdDb,
  deleteWebsiteByIdDb,
}
