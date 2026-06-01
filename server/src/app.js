import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import apiRouter from './routes/index.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: config.clientOrigins,
      credentials: true,
    }),
  )
  app.use(express.json())

  app.get('/', (req, res) => {
    res.json({
      message: 'COZY Order API',
      docs: 'docs/PRD.md',
      health: '/api/health',
    })
  })

  app.use('/api', apiRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
