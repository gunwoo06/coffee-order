import pg from 'pg'
import { config } from '../config.js'

const { Client } = pg

/** coffee_order_db가 없으면 postgres DB에 접속해 생성 */
export async function ensureDatabase() {
  const client = new Client({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: 'postgres',
  })

  await client.connect()

  try {
    const exists = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [config.db.name],
    )

    if (exists.rowCount === 0) {
      await client.query(`CREATE DATABASE "${config.db.name}"`)
      console.log(`Database "${config.db.name}" created.`)
    }
  } finally {
    await client.end()
  }
}
