import dotenv from 'dotenv'

dotenv.config({ override: true })

const port = Number(process.env.PORT) || 3000

const clientOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

export const config = {
  port,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigins,
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'coffee_order_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
}
