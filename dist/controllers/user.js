"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_USER = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _models = require("../models");
var _middlewares = require("../middlewares");
// * Libraries

_dotenv["default"].config();

// * Models

// * Middlewares

var CONTROLLER_USER = exports.CONTROLLER_USER = {
  // ZEAL FITNESS APP APIS

  profile: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _id, id, userId, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _id = req.user._id;
            id = req.query.id;
            if (id) {
              userId = id;
            } else userId = _id;
            _context.next = 5;
            return _models.User.findByIdAndUpdate(userId, {
              lastActive: new Date()
            },
            // the update operation
            {
              "new": true
            } // options for the update operation
            ).select('-password') // selecting fields to exclude
            .lean();
          case 5:
            user = _context.sent;
            if (user) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
              message: 'User not found.'
            }));
          case 8:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              data: {
                user: user
              },
              message: 'Profiles Fetched Successfully'
            });
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }())
};