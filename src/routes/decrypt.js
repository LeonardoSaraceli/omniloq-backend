import { Router } from 'express'
import { getDecryptedPassword } from '../controllers/decrypt.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getDecryptedPassword)

export default route
