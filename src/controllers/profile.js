import { getProfileByIdDb, updateProfileByIdDb } from '../domains/profile.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getProfileById = async (req, res) => {
  const profileId = Number(req.params.id)

  const profile = await getProfileByIdDb(profileId)

  if (!profile) {
    throw new NotFoundError('Profile not found')
  }

  return res.json({
    profile,
  })
}

const updateProfileById = async (req, res) => {
  const profileId = Number(req.params.id)

  const idFound = await getProfileByIdDb(profileId)

  if (!idFound) {
    throw new NotFoundError('Profile not found')
  }

  const { first_name, last_name } = req.body

  if (!first_name || !last_name) {
    throw new BadRequestError('Missing fields in request body')
  }

  const profile = await updateProfileByIdDb(profileId, first_name, last_name)

  return res.json({
    profile,
  })
}

export { getProfileById, updateProfileById }
