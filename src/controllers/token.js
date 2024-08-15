import jwt from 'jsonwebtoken'
import { InvalidTokenError } from '../errors/ApiError.js'

const verifyToken = (req, res) => {
  try {
    const headers = req.headers['authorization']

    const token = headers.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    throw new InvalidTokenError('Unauthorized token')
  }
}

export { verifyToken }
