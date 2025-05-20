// * Libraries
import { Router } from 'express'
import { Authenticate } from '../middlewares'
import { CONTROLLER_BALANCESHEET } from '../controllers/balanceSheet'

const router = Router()

router.post('/create', Authenticate(), CONTROLLER_BALANCESHEET.create)
router.post('/getBalanceSheet', Authenticate(), CONTROLLER_BALANCESHEET.getBalanceSheet)
router.post('/getBalanceSheetByMonth', Authenticate(), CONTROLLER_BALANCESHEET.getBalanceSheetByMonth)

export default router