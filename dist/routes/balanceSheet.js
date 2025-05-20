"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _middlewares = require("../middlewares");
var _balanceSheet = require("../controllers/balanceSheet");
// * Libraries

var router = (0, _express.Router)();
router.post('/create', (0, _middlewares.Authenticate)(), _balanceSheet.CONTROLLER_BALANCESHEET.create);
router.post('/getBalanceSheet', (0, _middlewares.Authenticate)(), _balanceSheet.CONTROLLER_BALANCESHEET.getBalanceSheet);
router.post('/getBalanceSheetByMonth', (0, _middlewares.Authenticate)(), _balanceSheet.CONTROLLER_BALANCESHEET.getBalanceSheetByMonth);
var _default = exports["default"] = router;