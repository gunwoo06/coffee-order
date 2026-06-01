import { createApp } from './app.js'
import { config } from './config.js'
import { connectDatabase } from './db/connect.js'
import { closePool } from './db/pool.js'

async function start() {
  try {
    const db = await connectDatabase()
    console.log(`PostgreSQL connected (${config.db.name}) at ${db.connected_at}`)
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message)
    console.error('  Check server/.env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)')
    if (!config.isDev) {
      process.exit(1)
    }
    console.warn('Development: API will start without DB. Fix .env then restart.')
  }

  const app = createApp()

  const server = app.listen(config.port, () => {
    console.log(`COZY API server running on http://localhost:${config.port}`)
    console.log(`  Health: http://localhost:${config.port}/api/health`)
    if (config.isDev) {
      console.log(`  CORS origins: ${config.clientOrigins.join(', ')}`)
    }
  })

  const shutdown = async () => {
    server.close()
    await closePool()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

start()
