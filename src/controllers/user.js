import {
  comparePassword,
  createChestDb,
  createItemDb,
  createProfileDb,
  createTokenDb,
  createUserDb,
  createWebsiteDb,
  deleteUserByIdDb,
  getUserByEmail,
  getUserByIdDb,
} from '../domains/user.js'
import {
  BadRequestError,
  ExistingUniqueField,
  MissingFieldsError,
  NotFoundError,
} from '../errors/ApiError.js'

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  if (!first_name || !last_name || !email || !password) {
    throw new MissingFieldsError('Missing fields in request body')
  }

  const user = await getUserByEmail(email)

  if (user) {
    throw new ExistingUniqueField('The email provided already exists')
  }

  const newUser = await createUserDb(email, password)

  await createProfileDb(first_name, last_name, newUser.id)

  const website = await createWebsiteDb('omniloq.com', newUser.id)

  const item = await createItemDb(
    'Omniloq account',
    email,
    password,
    newUser.id,
    website.id
  )

  await createChestDb('Personal', 'My general accounts.', newUser.id, item.id)

  delete newUser.password

  return res.status(201).json({
    user: newUser,
  })
}

const createToken = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new MissingFieldsError('Missing fields in request body')
  }

  const user = await getUserByEmail(email)

  if (!user) {
    throw new BadRequestError('The email or password are incorrect')
  }

  const passwordMatch = await comparePassword(password, user.password)

  if (!passwordMatch) {
    throw new BadRequestError('The email or password are incorrect')
  }

  const token = createTokenDb(user.id, process.env.SECRET_KEY)

  return res.status(201).json({
    token,
  })
}

const getUserById = async (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new BadRequestError('The id must be a number')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError("The id provided dosen't match any user")
  }

  delete user.password

  return res.json({
    user,
  })
}

const deleteUserById = async (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new BadRequestError('The id must be a number')
  }

  const userFound = await getUserByIdDb(id)

  if (!userFound) {
    throw new NotFoundError("The id provided dosen't match any user")
  }

  const user = await deleteUserByIdDb(id)

  delete user.password

  return res.json({
    user,
  })
}

export { createUser, createToken, getUserById, deleteUserById }
