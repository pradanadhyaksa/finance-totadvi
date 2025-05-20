"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
// * Libraries

// * Controllers

// * Middlewares

var router = (0, _express.Router)();
router.get('/profile', (0, _middlewares.Authenticate)(), _controllers.CONTROLLER_USER.profile);
var _default = exports["default"] = router;