import dotenv from 'dotenv'
dotenv.config({ override: true })
import { connectDatabase } from '../src/db/connect.js'
import { closePool } from '../src/db/pool.js'

try {
  const row = await connectDatabase()
  console.log('Database ready:', row.connected_at)
} catch (err) {
  console.error('Database init failed:', err.message)
  process.exit(1)
} finally {
  await closePool()
}
