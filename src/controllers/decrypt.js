import {
  decryptPasswordDb,
  getDecryptedPasswordDb,
} from '../domains/decrypt.js'
import { BadRequestError } from '../errors/ApiError.js'

const getDecryptedPassword = (req, res) => {
  const { password } = req.body

  if (!password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const bytes = decryptPasswordDb(password)

  if (bytes.sigBytes <= 0) {
    throw new BadRequestError('Incorrect password')
  }

  const decrypted = getDecryptedPasswordDb(bytes)

  return res.json({
    decrypted,
  })
}

export { getDecryptedPassword }
