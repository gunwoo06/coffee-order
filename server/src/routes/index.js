import { Router } from 'express'
import healthRouter from './health.js'

const router = Router()

router.use(healthRouter)

// TODO: menus, orders, admin 라우트 (docs/PRD.md §15)

export default router
