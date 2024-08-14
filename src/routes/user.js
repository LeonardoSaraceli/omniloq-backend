import { Router } from 'express'
import {
  createToken,
  createUser,
  deleteUserById,
  getUserById,
} from '../controllers/user.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/:id', isTokenValid, getUserById)
route.post('/register', createUser)
route.post('/login', createToken)
route.delete('/:id', isTokenValid, deleteUserById)

export default route
