import { Router } from 'express'
import {
  createItem,
  deleteItemById,
  editItemById,
  favoriteItemById,
  getAllItems,
  getItemById,
  hidePasswordById,
  showPasswordById,
  unfavoriteItemById,
} from '../controllers/item.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getAllItems)
route.get('/:id', isTokenValid, getItemById)
route.post('/', isTokenValid, createItem)
route.put('/favorite/:id', isTokenValid, favoriteItemById)
route.put('/unfavorite/:id', isTokenValid, unfavoriteItemById)
route.put('/show-password/:id', isTokenValid, showPasswordById)
route.put('/hide-password/:id', isTokenValid, hidePasswordById)
route.put('/edit/:id', isTokenValid, editItemById)
route.delete('/:id', isTokenValid, deleteItemById)

export default route
