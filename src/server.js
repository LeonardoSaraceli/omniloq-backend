import 'dotenv'
import express, { json } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'
import ApiError from './errors/ApiError.js'
import userRoute from './routes/user.js'
import profileRoute from './routes/profile.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(json())

app.use('/users', userRoute)
app.use('/profile', profileRoute)

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
