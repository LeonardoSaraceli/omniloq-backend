import {
  BadRequestError,
  ExistingUniqueField,
  InvalidTokenError,
  NotFoundError,
} from '../errors/ApiError.js'
import {
  createPasswordTokenDb,
  createTokenDb,
  createUserDb,
  deleteUserByIdDb,
  getUserByEmailDb,
  getUserByIdDb,
} from '../domains/user.js'
import { addItemToChestDb, createChestDb } from '../domains/chest.js'
import { createItemDb } from '../domains/item.js'
import { createWebsiteDb } from '../domains/website.js'
import {
  decryptPasswordDb,
  getDecryptedPasswordDb,
} from '../domains/decrypt.js'
import jwt from 'jsonwebtoken'

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

  const bytes = decryptPasswordDb(user.password)

  if (bytes.sigBytes <= 0) {
    throw new BadRequestError('Invalid password')
  }

  const decrypted = getDecryptedPasswordDb(bytes)

  if (password !== decrypted) {
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

const createPasswordToken = async (req, res) => {
  const { id } = req.user

  const { password } = req.body

  if (!password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const bytes = decryptPasswordDb(user.password)

  if (bytes.sigBytes <= 0) {
    throw new BadRequestError('Invalid password')
  }

  const decrypted = getDecryptedPasswordDb(bytes)

  if (password !== decrypted) {
    throw new BadRequestError('Incorrect email or password')
  }

  const token = createPasswordTokenDb(id)

  return res.status(201).json({
    token,
  })
}

const verifyToken = async (req, res) => {
  try {
    const headers = req.headers['authorization']

    const token = headers.split(' ')[1]

    const payload = jwt.verify(token, process.env.SECRET_KEY)

    if (payload.type !== 'password_view') {
      throw new InvalidTokenError('Invalid token type for password viewing')
    }

    return res.json({
      valid: true,
    })
  } catch (error) {
    throw new InvalidTokenError('Unauthorized token')
  }
}

export {
  getUserById,
  createUser,
  createToken,
  deleteUserById,
  createPasswordToken,
  verifyToken,
}
