import app, { allowedOrigin } from './server.js'
const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`CORS is allowing requests from ${allowedOrigin}`)
})
