import { Router } from 'express'
import {
  createWebsite,
  deleteWebsiteById,
  getAllWebsites,
} from '../controllers/website.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, getAllWebsites)
route.post('/', isTokenValid, createWebsite)
route.delete('/:id', isTokenValid, deleteWebsiteById)

export default route
