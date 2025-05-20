// * Libraries
import { Router } from 'express'
import { Authenticate } from '../middlewares'
import { CONTROLLER_SUBSCRIPTION } from '../controllers/subscription'

const router = Router()

router.post('/create', Authenticate(), CONTROLLER_SUBSCRIPTION.create)
router.post('/get', Authenticate(), CONTROLLER_SUBSCRIPTION.getSubscription)
router.post('/update', Authenticate(), CONTROLLER_SUBSCRIPTION.update)
router.post('/cancel', Authenticate(), CONTROLLER_SUBSCRIPTION.cancel)

export default router
