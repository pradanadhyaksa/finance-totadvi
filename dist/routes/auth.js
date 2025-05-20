"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
// * Libraries

var router = (0, _express.Router)();
router.post('/sign-up', _controllers.CONTROLLER_AUTH.signUp);
router.post('/sign-out', _controllers.CONTROLLER_AUTH.signOut);
router.post('/sign-in', _controllers.CONTROLLER_AUTH.signIn);
router.post('/update', _controllers.CONTROLLER_AUTH.updateUser);
router.post('/getUser', _controllers.CONTROLLER_AUTH.getUser);
router.post('/deleteUser', _controllers.CONTROLLER_AUTH.deleteUser);
router.post('/forgot-password', _controllers.CONTROLLER_AUTH.forgotPassword);
router.get('/reset-password/:token', _controllers.CONTROLLER_AUTH.verifyResetToken);
router.post('/reset-password/:token', _controllers.CONTROLLER_AUTH.resetPassword);
var _default = exports["default"] = router;