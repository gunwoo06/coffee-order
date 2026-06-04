import dotenv from 'dotenv'
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'
import { config } from '../src/config.js'

dotenv.config({ override: true })

const __dirname = dirname(fileURLToPath(import.meta.url))
const { Pool } = pg

const pool = new Pool(config.db.poolConfig)

async function runSqlFile(filename) {
  const sql = await readFile(join(__dirname, '../src/db', filename), 'utf8')
  await pool.query(sql)
  console.log(`Ran ${filename}`)
}

try {
  await runSqlFile('seed-menus.sql')
  await runSqlFile('seed-options.sql')
  console.log('Seed data applied.')
} catch (err) {
  console.error('Seed failed:', err.message)
  process.exit(1)
} finally {
  await pool.end()
}
