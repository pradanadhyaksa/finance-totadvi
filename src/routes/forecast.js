// * Libraries
import { Router } from 'express'
import { CONTROLLER_FORECAST } from '../controllers/forecast'
import { Authenticate } from '../middlewares'

const router = Router()

router.post('/create', Authenticate(), CONTROLLER_FORECAST.create)
router.post('/update', Authenticate(), CONTROLLER_FORECAST.update)
router.post('/get', Authenticate(), CONTROLLER_FORECAST.get)

export default router
