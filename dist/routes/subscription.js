"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _middlewares = require("../middlewares");
var _subscription = require("../controllers/subscription");
// * Libraries

var router = (0, _express.Router)();
router.post('/create', (0, _middlewares.Authenticate)(), _subscription.CONTROLLER_SUBSCRIPTION.create);
router.post('/get', (0, _middlewares.Authenticate)(), _subscription.CONTROLLER_SUBSCRIPTION.getSubscription);
router.post('/update', (0, _middlewares.Authenticate)(), _subscription.CONTROLLER_SUBSCRIPTION.update);
router.post('/cancel', (0, _middlewares.Authenticate)(), _subscription.CONTROLLER_SUBSCRIPTION.cancel);
var _default = exports["default"] = router;