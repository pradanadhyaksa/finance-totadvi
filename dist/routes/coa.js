"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _coa = require("../controllers/coa");
var _middlewares = require("../middlewares");
// * Libraries

var router = (0, _express.Router)();
router.post('/create', (0, _middlewares.Authenticate)(), _coa.CONTROLLER_COA.create);
router.post('/getCOA', (0, _middlewares.Authenticate)(), _coa.CONTROLLER_COA.getCOA);
var _default = exports["default"] = router;