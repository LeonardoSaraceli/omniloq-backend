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
  const { id } = req.user

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const items = await getAllItemsDb(id)

  return res.json({
    items,
  })
}

const getItemById = async (req, res) => {
  const { id } = req.user

  const itemId = Number(req.params.id)

  const item = await getItemByIdDb(id, itemId)

  if (!item) {
    throw new NotFoundError('Item not found')
  }

  return res.json({
    item,
  })
}

const createItem = async (req, res) => {
  const { id } = req.user

  const { name, email, username, password } = req.body

  if (!name || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const item = await createItemDb(id, name, email, username, password)

  return res.status(201).json({
    item,
  })
}

const favoriteItemById = async (req, res) => {
  const { id } = req.user

  if (!id) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(id, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await favoriteOrUnfavoriteItemByIdDb(id, itemId, true)

  return res.json({
    item,
  })
}

const unfavoriteItemById = async (req, res) => {
  const { id } = req.user

  if (!id) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(id, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await favoriteOrUnfavoriteItemByIdDb(id, itemId, false)

  return res.json({
    item,
  })
}

const editItemById = async (req, res) => {
  const { id } = req.user

  const { name, email, username, password } = req.body

  if (!name || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(id, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await editItemByIdDb(id, itemId, name, email, username, password)

  return res.json({
    item,
  })
}

const deleteItemById = async (req, res) => {
  const { id } = req.user

  const itemId = Number(req.params.id)

  const idFound = await getItemByIdDb(id, itemId)

  if (!idFound) {
    throw new NotFoundError('Item not found')
  }

  const item = await deleteItemByIdDb(id, itemId)

  return res.json({
    item,
  })
}

export {
  getAllItems,
  getItemById,
  createItem,
  favoriteItemById,
  unfavoriteItemById,
  editItemById,
  deleteItemById,
}
