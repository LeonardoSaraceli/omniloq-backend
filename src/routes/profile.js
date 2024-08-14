import { Router } from 'express'
import { getProfileById, updateProfileById } from '../controllers/profile.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/:id', isTokenValid, getProfileById)
route.put('/:id', isTokenValid, updateProfileById)

export default route
