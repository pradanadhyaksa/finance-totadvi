"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./routes"));
var _dbConnection = require("./config/dbConnection");
var _cors2 = require("./config/cors");
var _nodeHttp = require("node:http");
_dotenv["default"].config();
var app = (0, _express["default"])();
var server = (0, _nodeHttp.createServer)(app);
(0, _dbConnection.connectMongoDB)();
var PORT = process.env.PORT || 5000;
var clientBuildPath = _path["default"].join(__dirname, '../client/build');
app.use(_express["default"]["static"](clientBuildPath));
app.use((0, _morgan["default"])('dev'));
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])(_cors2.corsConfig));
app.use(_express["default"].json({
  limit: '50mb',
  extended: true
}));
app.use('/api', _routes["default"]);
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(clientBuildPath, 'index.html'));
});
server.listen(PORT, /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        console.log("[\u26A1\uFE0F server]: Server running on port ".concat(PORT));
      case 1:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
var _default = exports["default"] = server;