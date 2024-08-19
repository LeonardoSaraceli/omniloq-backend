import { Router } from 'express'
import {
  createToken,
  createUser,
  deleteUserById,
  getUserById,
} from '../controllers/user.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getUserById)
route.post('/register', createUser)
route.post('/login', createToken)
route.delete('/', isTokenValid, deleteUserById)

export default route
