/**
 * Render 등 원격 DB에 스키마만 적용 (CREATE TABLE)
 * 로컬: npm run db:schema
 */
import dotenv from 'dotenv'
dotenv.config({ override: true })

import { connectDatabase } from '../src/db/connect.js'
import { closePool } from '../src/db/pool.js'
import { config } from '../src/config.js'

try {
  console.log(`Connecting to ${config.db.isRemote ? 'remote' : 'local'} database...`)
  const row = await connectDatabase()
  console.log('Schema applied successfully at', row.connected_at)
  console.log('Tables: menus, options, orders, order_items')
} catch (err) {
  console.error('Schema migration failed:', err.message)
  if (config.db.isRemote) {
    console.error('Render tips:')
    console.error('  - DB_HOST = External Database URL의 호스트 (예: dpg-xxx-a.oregon-postgres.render.com)')
    console.error('  - .env에 DB_SSL=true 추가')
    console.error('  - 또는 DATABASE_URL(전체 연결 문자열) 사용')
  }
  process.exit(1)
} finally {
  await closePool()
}
