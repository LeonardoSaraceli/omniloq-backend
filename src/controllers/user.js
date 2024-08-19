import {
  BadRequestError,
  ExistingUniqueField,
  NotFoundError,
} from '../errors/ApiError.js'
import {
  createTokenDb,
  createUserDb,
  deleteUserByIdDb,
  getUserByEmailDb,
  getUserByIdDb,
  verifyPasswordDb,
} from '../domains/user.js'
import { addItemToChestDb, createChestDb } from '../domains/chest.js'
import { createItemDb } from '../domains/item.js'
import { createWebsiteDb } from '../domains/website.js'

const getUserById = async (req, res) => {
  const { id } = req.user

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  delete user.password

  return res.json({
    user,
  })
}

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  if (!first_name || !last_name || !email || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const emailFound = await getUserByEmailDb(email)

  if (emailFound) {
    throw new ExistingUniqueField('The email provided already exists')
  }

  const user = await createUserDb(first_name, last_name, email, password)

  const chest = await createChestDb(user.id, 'Personal', 'My general accounts')

  const item = await createItemDb(user.id, 'Omniloq', email, null, password)

  await createWebsiteDb(user.id, item.id, 'omniloq.com')

  await addItemToChestDb(user.id, chest.id, item.id)

  delete user.password

  return res.status(201).json({
    user,
  })
}

const createToken = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByEmailDb(email)

  if (!user) {
    throw new BadRequestError('Incorrect email or password')
  }

  const passwordMatch = await verifyPasswordDb(password, user.password)

  if (!passwordMatch) {
    throw new BadRequestError('Incorrect email or password')
  }

  const token = createTokenDb(user.id)

  return res.status(201).json({
    token,
  })
}

const deleteUserById = async (req, res) => {
  const { id } = req.user

  const idFound = await getUserByIdDb(id)

  if (!idFound) {
    throw new NotFoundError('User not found')
  }

  const user = await deleteUserByIdDb(id)

  delete user.password

  return res.json({
    user,
  })
}

export { getUserById, createUser, createToken, deleteUserById }
