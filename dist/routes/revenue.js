"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _revenue = require("../controllers/revenue");
var _middlewares = require("../middlewares");
// * Libraries

var router = (0, _express.Router)();
router.post('/create', (0, _middlewares.Authenticate)(), _revenue.CONTROLLER_REVENUE.create);
router.post('/getRevenue', (0, _middlewares.Authenticate)(), _revenue.CONTROLLER_REVENUE.getRevenue);
router.post('/getRevenueByMonth', (0, _middlewares.Authenticate)(), _revenue.CONTROLLER_REVENUE.getRevenueByMonth);
var _default = exports["default"] = router;