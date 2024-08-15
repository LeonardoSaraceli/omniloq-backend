import 'dotenv'
import express, { json } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'
import ApiError from './errors/ApiError.js'
import userRoute from './routes/user.js'
import profileRoute from './routes/profile.js'
import itemRoute from './routes/item.js'
import chestRoute from './routes/chest.js'
import ticketRoute from './routes/ticket.js'
import websiteRoute from './routes/website.js'
import decryptRoute from './routes/decrypt.js'
import tokenRoute from './routes/token.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(json())

app.use('/users', userRoute)
app.use('/profile', profileRoute)
app.use('/items', itemRoute)
app.use('/chests', chestRoute)
app.use('/tickets', ticketRoute)
app.use('/websites', websiteRoute)
app.use('/decrypt', decryptRoute)
app.use('/token', tokenRoute)

app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: error.message,
    })
  }

  console.log(error)

  res.status(500).json({
    error: 'Server error',
  })
})

export default app
