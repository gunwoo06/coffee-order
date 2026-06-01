import { Router } from 'express'
import { config } from '../config.js'
import { pool } from '../db/pool.js'

const router = Router()

router.get('/health', async (req, res, next) => {
  try {
    const dbResult = await pool.query('SELECT NOW() AS db_time')
    res.json({
      ok: true,
      service: 'cozy-order-api',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        name: config.db.name,
        time: dbResult.rows[0].db_time,
      },
    })
  } catch (err) {
    res.status(503).json({
      ok: false,
      service: 'cozy-order-api',
      timestamp: new Date().toISOString(),
      database: {
        connected: false,
        name: config.db.name,
        error: err.message,
      },
    })
  }
})

export default router
