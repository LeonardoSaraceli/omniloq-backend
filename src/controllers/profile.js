import { getProfileByIdDb, updateProfileDb } from '../domains/profile.js'
import { getUserByIdDb } from '../domains/user.js'
import {
  BadRequestError,
  MissingFieldsError,
  NotFoundError,
} from '../errors/ApiError.js'

const getProfileById = async (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new BadRequestError('The id must be a number')
  }

  const profile = await getProfileByIdDb(id)

  if (!profile) {
    throw new NotFoundError("The id provided dosen't match any profile")
  }

  return res.json({
    profile,
  })
}

const updateProfile = async (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new BadRequestError('The id must be a number')
  }

  const { first_name, last_name } = req.body

  if (!first_name || !last_name) {
    throw new MissingFieldsError('Missing fields in request body')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError("The id provided dosen't match any user")
  }

  const profile = await updateProfileDb(id, first_name, last_name)

  return res.json({
    profile,
  })
}

export { getProfileById, updateProfile }
