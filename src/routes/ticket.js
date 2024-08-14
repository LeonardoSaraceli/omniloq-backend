import { Router } from 'express'
import { createTicket } from '../controllers/ticket.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.post('/', isTokenValid, createTicket)

export default route
