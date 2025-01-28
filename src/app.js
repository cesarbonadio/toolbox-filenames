import express from 'express'
import cors from 'cors'

// routes imports
import indexRoutes from './routes/indexRoutes.js'
import filesRoutes from './routes/filesRoutes.js'

import limiter from './middlewares/rateLimit.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', indexRoutes)
app.use('/files', [limiter], filesRoutes)

export default app