import { Router } from 'express'
import userRoutes from './user'
import authRoutes from './auth'
import revenueRoutes from './revenue'
import coaRoutes from './coa'
import forecastRoutes from './forecast'
import balanceSheetRoutes from './balanceSheet'
import subscriptionRoutes from './subscription'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/revenue', revenueRoutes)
router.use('/coa', coaRoutes)
router.use('/forecast', forecastRoutes)
router.use('/balanceSheet', balanceSheetRoutes)
router.use('/subscription', subscriptionRoutes)

export default router