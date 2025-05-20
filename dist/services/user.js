"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.createUser = exports.createErrorLog = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _models = require("../models");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // * Libraries
// * Models
var generateToken = exports.generateToken = function generateToken(payload) {
  return new Promise(function (resolve, reject) {
    var token = _jsonwebtoken["default"].sign(payload, process.env.USER_ROLE_JWT_SECRET_KEY, {
      expiresIn: '9999 years'
    });
    resolve(token);
  });
};
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          newUser = new _models.User(payload);
          _context.next = 3;
          return newUser.save();
        case 3:
          return _context.abrupt("return", newUser);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createErrorLog = exports.createErrorLog = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
    var body, newErrorLog;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          body = _ref2.body;
          _context2.next = 3;
          return new _models.ErrorLog(_objectSpread({}, body)).save();
        case 3:
          newErrorLog = _context2.sent;
          return _context2.abrupt("return", newErrorLog);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createErrorLog(_x2) {
    return _ref3.apply(this, arguments);
  };
}();