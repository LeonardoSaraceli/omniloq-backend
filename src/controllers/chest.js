import {
  addItemToChestDb,
  createChestDb,
  deleteChestByIdDb,
  editChestByIdDb,
  getAllChestsDb,
  getChestByIdDb,
  removeItemFromChestDb,
} from '../domains/chest.js'
import { getItemByIdDb } from '../domains/item.js'
import { getUserByIdDb } from '../domains/user.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllChests = async (req, res) => {
  const { id } = req.user

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const chests = await getAllChestsDb(id)

  return res.json({
    chests,
  })
}

const createChest = async (req, res) => {
  const { id } = req.user

  const { name, description } = req.body

  if (!name) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const chest = await createChestDb(id, name, description)

  return res.status(201).json({
    chest,
  })
}

const editChestById = async (req, res) => {
  const { id } = req.user

  const { name, description } = req.body

  if (!name) {
    throw new BadRequestError('Missing fields in request body')
  }

  const chestId = Number(req.params.id)

  const idFound = await getChestByIdDb(id, chestId)

  if (!idFound) {
    throw new NotFoundError('Chest not found')
  }

  const chest = await editChestByIdDb(id, chestId, name, description)

  return res.json({
    chest,
  })
}

const deleteChestById = async (req, res) => {
  const { id } = req.user

  const chestId = Number(req.params.id)

  const idFound = await getChestByIdDb(id, chestId)

  if (!idFound) {
    throw new NotFoundError('Chest not found')
  }

  const chest = await deleteChestByIdDb(id, chestId)

  return res.json({
    chest,
  })
}

const addOrRemoveChestItem = async (req, res) => {
  const addPath = req.path.includes('add')

  const { id } = req.user

  const { chestId } = req.body

  if (!chestId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const chestIdFound = await getChestByIdDb(id, chestId)

  if (!chestIdFound) {
    throw new NotFoundError('Chest not found')
  }

  const itemId = Number(req.params.id)

  const itemIdFound = await getItemByIdDb(id, itemId)

  if (!itemIdFound) {
    throw new NotFoundError('Item not found')
  }

  const itemExists = chestIdFound.items.some((item) => item.id === itemId)

  if (addPath && itemExists) {
    throw new BadRequestError('Item already added to the chest')
  }

  if (!addPath && !itemExists) {
    throw new BadRequestError('Item not found in the chest')
  }

  const chest = addPath
    ? await addItemToChestDb(id, chestId, itemId)
    : await removeItemFromChestDb(id, chestId, itemId)

  return res.json({
    chest,
  })
}

const getChestById = async (req, res) => {
  const { id } = req.user

  const chestId = Number(req.params.id)

  const chest = await getChestByIdDb(id, chestId)

  if (!chest) {
    throw new NotFoundError('Chest not found')
  }

  return res.json({
    chest,
  })
}

export {
  getAllChests,
  createChest,
  editChestById,
  deleteChestById,
  addOrRemoveChestItem,
  getChestById,
}
