import { Router } from 'express'
import { findAllMenusForCustomer } from '../repositories/menus.js'

const router = Router()

router.get('/menus', async (req, res, next) => {
  try {
    const menus = await findAllMenusForCustomer()
    res.json({ menus })
  } catch (err) {
    next(err)
  }
})

export default router
