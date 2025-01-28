import app from './app.js'
import dotenv from 'dotenv'

// configure dotenv
dotenv.config()

// get port and host from env
const listenPort = process.env.PORT
const listenHost = process.env.HOST

// create http server
export const server = app.listen(listenPort, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(`Created http (express) server at http://${host}:${port}`)
})