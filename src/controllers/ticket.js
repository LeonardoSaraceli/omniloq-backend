import { createTicketDb } from '../domains/ticket.js'
import { getUserByIdDb } from '../domains/user.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const createTicket = async (req, res) => {
  const { id } = req.user

  const { title, message } = req.body

  if (!title || !message) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const ticket = await createTicketDb(id, title, message)

  return res.status(201).json({
    ticket,
  })
}

export { createTicket }
