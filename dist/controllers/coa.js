"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_COA = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _middlewares = require("../middlewares");
var _coa = require("../models/coa");
var CONTROLLER_COA = exports.CONTROLLER_COA = {
  create: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, userId, data, existingCOA, coa, savedCOA;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, userId = _req$body.userId, data = _req$body.data;
            _context.next = 4;
            return _coa.COA.findOne({
              userId: userId
            });
          case 4:
            existingCOA = _context.sent;
            if (!existingCOA) {
              _context.next = 12;
              break;
            }
            existingCOA.data = data;
            _context.next = 9;
            return existingCOA.updateOne({
              $set: {
                data: data
              }
            });
          case 9:
            res.status(201).json({
              message: 'Revenue created successfully',
              data: existingCOA.toObject()
            });
            _context.next = 17;
            break;
          case 12:
            coa = new _coa.COA({
              userId: userId,
              data: data
            });
            _context.next = 15;
            return coa.save();
          case 15:
            savedCOA = _context.sent;
            res.status(201).json({
              message: 'COA created successfully',
              data: savedCOA.toObject()
            });
          case 17:
            _context.next = 22;
            break;
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context.t0.message
            });
          case 22:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 19]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()),
  getCOA: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var userId, coa;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.body.userId;
            _context2.next = 4;
            return _coa.COA.findOne({
              userId: userId
            });
          case 4:
            coa = _context2.sent;
            if (coa) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              message: 'COA Not Founded!'
            }));
          case 7:
            res.status(201).json({
              message: 'COA Successfully Downloaded!',
              data: coa.toObject()
            });
            _context2.next = 13;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context2.t0.message
            });
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 10]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }())
};