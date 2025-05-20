"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_REVENUE = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _middlewares = require("../middlewares");
var _revenue = require("../models/revenue");
var CONTROLLER_REVENUE = exports.CONTROLLER_REVENUE = {
  create: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, userId, date, dateFlag, data, existingRevenue, revenue, savedRevenue;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, userId = _req$body.userId, date = _req$body.date, dateFlag = _req$body.dateFlag, data = _req$body.data;
            _context.next = 4;
            return _revenue.Revenue.findOne({
              userId: userId,
              date: date
            });
          case 4:
            existingRevenue = _context.sent;
            if (!existingRevenue) {
              _context.next = 12;
              break;
            }
            existingRevenue.data = data;
            _context.next = 9;
            return existingRevenue.updateOne({
              $set: {
                data: data
              }
            });
          case 9:
            res.status(201).json({
              message: 'Revenue Updated successfully',
              data: existingRevenue.toObject()
            });
            _context.next = 17;
            break;
          case 12:
            revenue = new _revenue.Revenue({
              userId: userId,
              date: date,
              dateFlag: dateFlag,
              data: data
            });
            _context.next = 15;
            return revenue.save();
          case 15:
            savedRevenue = _context.sent;
            res.status(201).json({
              message: 'Revenue created successfully',
              data: savedRevenue.toObject()
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
  getRevenue: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, userId, date, revenue;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, userId = _req$body2.userId, date = _req$body2.date;
            _context2.next = 4;
            return _revenue.Revenue.findOne({
              userId: userId,
              date: date
            });
          case 4:
            revenue = _context2.sent;
            if (revenue) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              message: 'Revenue Not Founded!'
            }));
          case 7:
            res.status(201).json({
              message: 'Revenue Successfully Downloaded!',
              data: revenue.toObject()
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
  }()),
  getRevenueByMonth: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _req$body3, userId, date, revenue, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, date = _req$body3.date;
            _context3.next = 4;
            return _revenue.Revenue.find({
              $and: [{
                dateFlag: {
                  $gte: date.from
                },
                userId: userId
              }]
            });
          case 4:
            revenue = _context3.sent;
            result = revenue.filter(function (item) {
              return item.dateFlag <= date.to;
            });
            if (!(result.length == 0)) {
              _context3.next = 8;
              break;
            }
            return _context3.abrupt("return", res.status(404).json({
              message: 'Revenue Not Founded!'
            }));
          case 8:
            res.status(201).json({
              message: 'Revenue Successfully Downloaded!',
              data: result
            });
            _context3.next = 14;
            break;
          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context3.t0.message
            });
          case 14:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 11]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }())
};