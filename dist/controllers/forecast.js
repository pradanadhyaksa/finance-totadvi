"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_FORECAST = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _middlewares = require("../middlewares");
var _Forecast = require("../models/Forecast");
var CONTROLLER_FORECAST = exports.CONTROLLER_FORECAST = {
  create: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, userId, date, dateFlag, data, existingForecast, tempData, missing, result, forecast, savedForecast;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, userId = _req$body.userId, date = _req$body.date, dateFlag = _req$body.dateFlag, data = _req$body.data;
            _context.next = 4;
            return _Forecast.Forecast.findOne({
              userId: userId,
              date: date
            });
          case 4:
            existingForecast = _context.sent;
            if (!existingForecast) {
              _context.next = 14;
              break;
            }
            missing = [];
            data.forEach(function (element) {
              var flag = true;
              tempData = existingForecast.data.map(function (item) {
                if (item[1] === element[1]) {
                  item[3] = element[3];
                  flag = false;
                  return item;
                }
                return item;
              });
              //missing element
              if (flag === true) {
                missing.push(element);
              }
            });
            result = [].concat((0, _toConsumableArray2["default"])(tempData), missing);
            _context.next = 11;
            return existingForecast.updateOne({
              $set: {
                data: result
              }
            });
          case 11:
            return _context.abrupt("return", res.status(201).json(existingForecast.toObject()));
          case 14:
            forecast = new _Forecast.Forecast({
              userId: userId,
              date: date,
              dateFlag: dateFlag,
              data: data
            });
            _context.next = 17;
            return forecast.save();
          case 17:
            savedForecast = _context.sent;
            return _context.abrupt("return", res.status(201).json(savedForecast.toObject()));
          case 19:
            _context.next = 24;
            break;
          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              message: 'Server error',
              error: _context.t0.message
            }));
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 21]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()),
  update: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, userId, date, dateFlag, data, existingForecast, tempData, missing, result, forecast, savedForecast;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, userId = _req$body2.userId, date = _req$body2.date, dateFlag = _req$body2.dateFlag, data = _req$body2.data;
            _context2.next = 4;
            return _Forecast.Forecast.findOne({
              userId: userId,
              date: date
            });
          case 4:
            existingForecast = _context2.sent;
            if (!existingForecast) {
              _context2.next = 14;
              break;
            }
            missing = [];
            data.forEach(function (element) {
              var flag = true;
              tempData = existingForecast.data.map(function (item) {
                if (item[1] === element[1]) {
                  item[4] = element[4];
                  flag = false;
                  return item;
                }
                return item;
              });
              //missing element
              if (flag === true) {
                missing.push(element);
              }
            });
            result = [].concat((0, _toConsumableArray2["default"])(tempData), missing);
            _context2.next = 11;
            return existingForecast.updateOne({
              $set: {
                data: result
              }
            });
          case 11:
            return _context2.abrupt("return", res.status(201).json(existingForecast.toObject()));
          case 14:
            forecast = new _Forecast.Forecast({
              userId: userId,
              date: date,
              dateFlag: dateFlag,
              data: data
            });
            _context2.next = 17;
            return forecast.save();
          case 17:
            savedForecast = _context2.sent;
            return _context2.abrupt("return", res.status(201).json(savedForecast.toObject()));
          case 19:
            _context2.next = 24;
            break;
          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              message: 'Server error',
              error: _context2.t0.message
            }));
          case 24:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 21]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()),
  get: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _req$body3, userId, date, forecast, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, date = _req$body3.date;
            _context3.next = 4;
            return _Forecast.Forecast.find({
              $and: [{
                dateFlag: {
                  $gte: date.from
                },
                userId: userId
              }]
            });
          case 4:
            forecast = _context3.sent;
            result = forecast.filter(function (item) {
              return item.dateFlag <= date.to;
            });
            if (!(result.length == 0)) {
              _context3.next = 8;
              break;
            }
            return _context3.abrupt("return", res.status(404).json({
              message: 'Forecast Not Founded!'
            }));
          case 8:
            return _context3.abrupt("return", res.status(201).json(result));
          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              message: 'Server error',
              error: _context3.t0.message
            }));
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