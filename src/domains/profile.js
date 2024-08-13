import { prisma } from '../utils/prisma.js'

const getProfileByIdDb = async (id) => {
  return await prisma.profile.findUnique({
    where: {
      id: id,
    },
  })
}

const updateProfileDb = async (id, first_name, last_name) => {
  return await prisma.profile.update({
    where: {
      userId: id,
    },
    data: {
      first_name: first_name,
      last_name: last_name,
    },
  })
}

export { getProfileByIdDb, updateProfileDb }
