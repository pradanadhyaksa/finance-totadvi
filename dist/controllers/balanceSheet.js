"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_BALANCESHEET = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _middlewares = require("../middlewares");
var _BalanceSheet = require("../models/BalanceSheet");
var CONTROLLER_BALANCESHEET = exports.CONTROLLER_BALANCESHEET = {
  create: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, userId, date, dateFlag, data, existingBalanceSheet, balanceSheet, savedBalanceSheet;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, userId = _req$body.userId, date = _req$body.date, dateFlag = _req$body.dateFlag, data = _req$body.data;
            _context.next = 4;
            return _BalanceSheet.BalanceSheet.findOne({
              userId: userId,
              date: date
            });
          case 4:
            existingBalanceSheet = _context.sent;
            if (!existingBalanceSheet) {
              _context.next = 12;
              break;
            }
            existingBalanceSheet.data = data;
            _context.next = 9;
            return existingBalanceSheet.updateOne({
              $set: {
                data: data
              }
            });
          case 9:
            res.status(201).json({
              message: 'BalanceSheet Updated successfully',
              data: existingBalanceSheet.toObject()
            });
            _context.next = 17;
            break;
          case 12:
            balanceSheet = new _BalanceSheet.BalanceSheet({
              userId: userId,
              date: date,
              dateFlag: dateFlag,
              data: data
            });
            _context.next = 15;
            return balanceSheet.save();
          case 15:
            savedBalanceSheet = _context.sent;
            res.status(201).json({
              message: 'BalanceSheet created successfully',
              data: savedBalanceSheet.toObject()
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
  getBalanceSheet: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, userId, date, balanceSheet;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, userId = _req$body2.userId, date = _req$body2.date;
            _context2.next = 4;
            return _BalanceSheet.BalanceSheet.findOne({
              userId: userId,
              date: date
            });
          case 4:
            balanceSheet = _context2.sent;
            if (balanceSheet) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              message: 'BalanceSheet Not Founded!'
            }));
          case 9:
            res.status(201).json({
              message: 'BalanceSheet Successfully Downloaded!',
              data: balanceSheet.toObject()
            });
          case 10:
            _context2.next = 15;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context2.t0.message
            });
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 12]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()),
  getBalanceSheetByMonth: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _req$body3, userId, date, balanceSheet, result, mongooseUserId, total;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, date = _req$body3.date;
            _context3.next = 4;
            return _BalanceSheet.BalanceSheet.find({
              $and: [{
                dateFlag: {
                  $gte: date.from
                },
                userId: userId
              }]
            });
          case 4:
            balanceSheet = _context3.sent;
            result = balanceSheet.filter(function (item) {
              return item.dateFlag <= date.to;
            });
            mongooseUserId = new _mongoose["default"].Types.ObjectId(userId);
            _context3.next = 9;
            return _BalanceSheet.BalanceSheet.aggregate([{
              $match: {
                userId: mongooseUserId
              }
            }, {
              $unwind: '$data'
            }, {
              $project: {
                accountId: {
                  $cond: {
                    "if": {
                      $isArray: '$data'
                    },
                    then: {
                      $arrayElemAt: ['$data', 0]
                    },
                    "else": null
                  }
                },
                amount: {
                  $cond: {
                    "if": {
                      $isArray: '$data'
                    },
                    then: {
                      $arrayElemAt: ['$data', 2]
                    },
                    "else": 0
                  }
                }
              }
            }, {
              $group: {
                _id: '$accountId',
                lifetime_balance: {
                  $sum: '$amount'
                }
              }
            }, {
              $project: {
                _id: 0,
                AccountId: '$_id',
                lifetime_balance: 1
              }
            }]);
          case 9:
            total = _context3.sent;
            if (result.length == 0) {
              res.status(404).json({
                message: 'BalanceSheet Not Founded!'
              });
            } else {
              res.status(201).json({
                message: 'BalanceSheet Successfully Downloaded!',
                data: result,
                total: total
              });
            }
            _context3.next = 16;
            break;
          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context3.t0.message
            });
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 13]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }())
};