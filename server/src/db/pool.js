import pg from 'pg'
import { config } from '../config.js'

const { Pool } = pg

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  user: config.db.user,
  password: config.db.password,
})

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err)
})

export async function testConnection() {
  const result = await pool.query('SELECT NOW() AS connected_at')
  return result.rows[0]
}

export async function closePool() {
  await pool.end()
}
