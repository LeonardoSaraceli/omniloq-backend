import { Router } from 'express'
import { getProfileById, updateProfile } from '../controllers/profile.js'

const route = Router()

route.get('/:id', getProfileById)
route.put('/:id', updateProfile)

export default route
