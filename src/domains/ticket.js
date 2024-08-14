import { prisma } from '../utils/prisma.js'

const createTicketDb = async (userId, title, message) => {
  return await prisma.ticket.create({
    data: {
      userId: userId,
      title: title,
      message: message,
    },
  })
}

export { createTicketDb }
