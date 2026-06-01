import { ensureDatabase } from './ensureDatabase.js'
import { initSchema } from './initSchema.js'
import { testConnection } from './pool.js'

export async function connectDatabase({ runMigrations = true } = {}) {
  await ensureDatabase()

  if (runMigrations) {
    await initSchema()
  }

  const row = await testConnection()
  return row
}
