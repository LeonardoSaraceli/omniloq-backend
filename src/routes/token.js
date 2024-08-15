import { Router } from 'express'
import { isTokenValid } from '../middleware/auth.js'
import { verifyToken } from '../controllers/token.js'

const route = Router()

route.get('/', verifyToken)

export default route
