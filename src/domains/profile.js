import { prisma } from '../utils/prisma.js'

const getProfileByIdDb = async (profileId) => {
  return await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  })
}

const updateProfileByIdDb = async (profileId, first_name, last_name) => {
  return await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      first_name: first_name,
      last_name: last_name,
    },
  })
}

export { getProfileByIdDb, updateProfileByIdDb }
