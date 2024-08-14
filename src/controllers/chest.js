import {
  createChestDb,
  deleteChestByIdDb,
  editChestByIdDb,
  getAllChestsDb,
  getChestByIdDb,
} from '../domains/chest.js'
import { getUserByIdDb } from '../domains/user.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllChests = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const chests = await getAllChestsDb(userId)

  return res.json({
    chests,
  })
}

const createChest = async (req, res) => {
  const { userId, name, description } = req.body

  if (!userId || !name) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const chest = await createChestDb(userId, name, description)

  return res.status(201).json({
    chest,
  })
}

const editChestById = async (req, res) => {
  const { userId, name, description } = req.body

  if (!userId || !name) {
    throw new BadRequestError('Missing fields in request body')
  }

  const chestId = Number(req.params.id)

  const idFound = await getChestByIdDb(userId, chestId)

  if (!idFound) {
    throw new NotFoundError('Chest not found')
  }

  const chest = await editChestByIdDb(userId, chestId, name, description)

  return res.json({
    chest,
  })
}

const deleteChestById = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const chestId = Number(req.params.id)

  const idFound = await getChestByIdDb(userId, chestId)

  if (!idFound) {
    throw new NotFoundError('Chest not found')
  }

  const chest = await deleteChestByIdDb(userId, chestId)

  return res.json({
    chest,
  })
}

export { getAllChests, createChest, editChestById, deleteChestById }
