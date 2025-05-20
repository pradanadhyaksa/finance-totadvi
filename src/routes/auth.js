// * Libraries
import { Router } from 'express'
import { CONTROLLER_AUTH } from '../controllers'
const router = Router()

router.post('/sign-up', CONTROLLER_AUTH.signUp)
router.post('/sign-out', CONTROLLER_AUTH.signOut)
router.post('/sign-in', CONTROLLER_AUTH.signIn)
router.post('/update', CONTROLLER_AUTH.updateUser)
router.post('/getUser', CONTROLLER_AUTH.getUser)
router.post('/deleteUser', CONTROLLER_AUTH.deleteUser)
router.post('/forgot-password', CONTROLLER_AUTH.forgotPassword);
router.get('/reset-password/:token', CONTROLLER_AUTH.verifyResetToken);
router.post('/reset-password/:token', CONTROLLER_AUTH.resetPassword);

export default router
