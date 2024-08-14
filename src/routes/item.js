import { Router } from 'express'
import {
  createItem,
  deleteItemById,
  editItemById,
  favoriteItemById,
  getAllItems,
  unfavoriteItemById,
} from '../controllers/item.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getAllItems)
route.post('/', isTokenValid, createItem)
route.put('/favorite/:id', isTokenValid, favoriteItemById)
route.put('/unfavorite/:id', isTokenValid, unfavoriteItemById)
route.put('/edit/:id', isTokenValid, editItemById)
route.delete('/:id', isTokenValid, deleteItemById)

export default route
