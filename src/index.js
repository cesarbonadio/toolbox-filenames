import app from './app.js'
import dotenv from 'dotenv'

// configure dotenv
dotenv.config()

// get port and host from env
const listenPort = process.env.PORT
const listenHost = process.env.HOST

// create http server
export const server = app.listen(listenPort, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Created http (express) server at http://${host}:${port}`)
})
