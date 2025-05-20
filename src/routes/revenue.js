// * Libraries
import { Router } from 'express'
import { CONTROLLER_REVENUE } from '../controllers/revenue'
import { Authenticate } from '../middlewares'

const router = Router()

router.post('/create', Authenticate(), CONTROLLER_REVENUE.create)
router.post('/getRevenue', Authenticate(), CONTROLLER_REVENUE.getRevenue)
router.post('/getRevenueByMonth', Authenticate(), CONTROLLER_REVENUE.getRevenueByMonth)

export default router
