import { ensureDatabase } from './ensureDatabase.js'
import { initSchema } from './initSchema.js'
import { testConnection } from './pool.js'
import { config } from '../config.js'

export async function connectDatabase({ runMigrations = true } = {}) {
  if (!config.db.skipEnsureDatabase) {
    await ensureDatabase()
  }

  if (runMigrations) {
    await initSchema()
  }

  const row = await testConnection()
  return row
}
