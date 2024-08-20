import { Router } from 'express'
import {
  createPasswordToken,
  createToken,
  createUser,
  deleteUserById,
  getUserById,
  verifyToken,
} from '../controllers/user.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getUserById)
route.get('/verify-token', isTokenValid, verifyToken)
route.post('/register', createUser)
route.post('/create-pw-token', isTokenValid, createPasswordToken)
route.post('/login', createToken)
route.delete('/', isTokenValid, deleteUserById)

export default route
