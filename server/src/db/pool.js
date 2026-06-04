import pg from 'pg'
import { config } from '../config.js'

const { Pool } = pg

export const pool = new Pool(config.db.poolConfig)

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
