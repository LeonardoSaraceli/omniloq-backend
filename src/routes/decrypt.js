import { Router } from 'express'
import { updateDecryptedPassword } from '../controllers/decrypt.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.put('/', isTokenValid, updateDecryptedPassword)

export default route
