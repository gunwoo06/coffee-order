import { Router } from 'express'
import healthRouter from './health.js'
import menusRouter from './menus.js'

const router = Router()

router.use(healthRouter)
router.use(menusRouter)

export default router
