import { Router } from 'express'
import {
  createToken,
  createUser,
  deleteUserById,
  getUserById,
} from '../controllers/user.js'

const route = Router()

route.get('/:id', getUserById)
route.post('/register', createUser)
route.post('/login', createToken)
route.delete('/:id', deleteUserById)

export default route
