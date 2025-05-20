"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _yamljs = _interopRequireDefault(require("yamljs"));
var _swagger = _interopRequireDefault(require("../../swagger.json"));
// import yamlConfig from './swagger.yaml'
// const swaggerDocument = YAML.load('./swagger.yaml') // dist/swagger.yaml

var router = (0, _express.Router)();
var options = {
  explorer: false
};
router.use('/', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"], options));
var _default = exports["default"] = router;