import { Router } from 'express'
import { getProfileById, updateProfileById } from '../controllers/profile.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getProfileById)
route.put('/', isTokenValid, updateProfileById)

export default route
