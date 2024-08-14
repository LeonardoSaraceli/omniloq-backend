import CryptoJS from 'crypto-js'

const decryptPasswordDb = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.SECRET_KEY)
}

const getDecryptedPasswordDb = (bytes) => {
  return bytes.toString(CryptoJS.enc.Utf8)
}

export { decryptPasswordDb, getDecryptedPasswordDb }
