import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { pool } from './pool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function initSchema() {
  const sql = await readFile(join(__dirname, 'schema.sql'), 'utf8')
  await pool.query(sql)
}
