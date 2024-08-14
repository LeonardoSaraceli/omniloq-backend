import { Router } from 'express'
import {
  createChest,
  deleteChestById,
  editChestById,
  getAllChests,
} from '../controllers/chest.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getAllChests)
route.post('/', isTokenValid, createChest)
route.put('/:id', isTokenValid, editChestById)
route.delete('/:id', isTokenValid, deleteChestById)

export default route
