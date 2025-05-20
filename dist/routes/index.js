"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("./user"));
var _auth = _interopRequireDefault(require("./auth"));
var _revenue = _interopRequireDefault(require("./revenue"));
var _coa = _interopRequireDefault(require("./coa"));
var _forecast = _interopRequireDefault(require("./forecast"));
var _balanceSheet = _interopRequireDefault(require("./balanceSheet"));
var _subscription = _interopRequireDefault(require("./subscription"));
var router = (0, _express.Router)();
router.use('/auth', _auth["default"]);
router.use('/user', _user["default"]);
router.use('/revenue', _revenue["default"]);
router.use('/coa', _coa["default"]);
router.use('/forecast', _forecast["default"]);
router.use('/balanceSheet', _balanceSheet["default"]);
router.use('/subscription', _subscription["default"]);
var _default = exports["default"] = router;