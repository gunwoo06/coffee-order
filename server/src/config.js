import dotenv from 'dotenv'

dotenv.config({ override: true })

const port = Number(process.env.PORT) || 3000

const clientOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

function buildDbConfig() {
  const useSsl =
    process.env.DB_SSL === 'true' ||
    Boolean(process.env.DATABASE_URL) ||
    (process.env.DB_HOST || '').includes('dpg-')

  const ssl = useSsl ? { rejectUnauthorized: false } : undefined

  if (process.env.DATABASE_URL) {
    return {
      poolConfig: {
        connectionString: process.env.DATABASE_URL,
        ssl,
      },
      skipEnsureDatabase: true,
      isRemote: true,
    }
  }

  return {
    poolConfig: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'coffee_order_db',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl,
    },
    skipEnsureDatabase:
      useSsl || process.env.DB_SKIP_ENSURE === 'true',
    isRemote: useSsl,
  }
}

const dbBuilt = buildDbConfig()

export const config = {
  port,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigins,
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
  db: {
    ...dbBuilt.poolConfig,
    poolConfig: dbBuilt.poolConfig,
    skipEnsureDatabase: dbBuilt.skipEnsureDatabase,
    isRemote: dbBuilt.isRemote,
    name: process.env.DB_NAME || 'coffee_order_db',
  },
}
