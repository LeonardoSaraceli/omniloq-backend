import {
  createItemDb,
  deleteItemByIdDb,
  editItemByIdDb,
  favoriteOrUnfavoriteItemByIdDb,
  getAllItemsDb,
  getItemByIdDb,
} from '../domains/item.js'
import { getUserByIdDb } from '../domains/user.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllItems = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const items = await getAllItemsDb(userId)

  return res.json({
    items,
  })
}

const createItem = async (req, res) => {
  const { userId, name, email, username, password } = req.body

  if (!userId || !name || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const item = await createItemDb(userId, name, email, username, password)

  return res.status(201).json({
    item,
  })
}

const favoriteItemById = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(userId, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await favoriteOrUnfavoriteItemByIdDb(userId, itemId, true)

  return res.json({
    item,
  })
}

const unfavoriteItemById = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(userId, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await favoriteOrUnfavoriteItemByIdDb(userId, itemId, false)

  return res.json({
    item,
  })
}

const editItemById = async (req, res) => {
  const { userId, name, email, username, password } = req.body

  if (!userId || !name || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(userId, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await editItemByIdDb(
    userId,
    itemId,
    name,
    email,
    username,
    password
  )

  return res.json({
    item,
  })
}

const deleteItemById = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(userId, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await deleteItemByIdDb(userId, itemId)

  return res.json({
    item,
  })
}

export {
  getAllItems,
  createItem,
  favoriteItemById,
  unfavoriteItemById,
  editItemById,
  deleteItemById,
}
