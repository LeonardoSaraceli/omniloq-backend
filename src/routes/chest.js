import { Router } from 'express'
import {
  createChest,
  deleteChestById,
  editChestById,
  getAllChests,
  addOrRemoveChestItem,
  getChestById,
} from '../controllers/chest.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getAllChests)
route.get('/:id', isTokenValid, getChestById)
route.post('/', isTokenValid, createChest)
route.put('/add-item/:id', addOrRemoveChestItem)
route.put('/remove-item/:id', addOrRemoveChestItem)
route.put('/:id', isTokenValid, editChestById)
route.delete('/:id', isTokenValid, deleteChestById)

export default route
