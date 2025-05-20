"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _forecast = require("../controllers/forecast");
var _middlewares = require("../middlewares");
// * Libraries

var router = (0, _express.Router)();
router.post('/create', (0, _middlewares.Authenticate)(), _forecast.CONTROLLER_FORECAST.create);
router.post('/update', (0, _middlewares.Authenticate)(), _forecast.CONTROLLER_FORECAST.update);
router.post('/get', (0, _middlewares.Authenticate)(), _forecast.CONTROLLER_FORECAST.get);
var _default = exports["default"] = router;