"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authenticate = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var jwt = require('jsonwebtoken');
// const RefreshToken = require('../models/RefreshToken')
// import _, { isEmpty } from 'lodash'

// export const Authenticate = (req, res, next) => {
//   const { role } = req.body

//   let token = req.headers['x-access-token'] || req.headers.authorization
//   if (isEmpty(token)) return res.status(STATUS.unAuthorized).json({ message: 'Unauthorized - Token was not provided' })
//   if (token.startsWith('Bearer ')) {
//     // Remove Bearer from string
//     token = token.slice(7, token.length).trimLeft()
//   }
//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
//     if (err) return res.status(STATUS.unAuthorized).json({ message: err.message })
//     req.user = user
//     req.role = user.role

//     const refreshTokens = await RefreshToken.find({ user: user._id })
//     req.user.ownsToken = (token) => !!refreshTokens.find((x) => x.token === token)

//     return next()
//   })
// }

var Authenticate = exports.Authenticate = function Authenticate() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    authorize: true
  };
  return function (req, res, next) {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
      token = token.slice(7, token.length); // Remove "Bearer " from the token string
      jwt.verify(token, process.env.JWT_SECRET_KEY, /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(err, decoded) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!decoded) {
                  _context.next = 5;
                  break;
                }
                req.user = decoded; // Attach the decoded payload to req.user
                return _context.abrupt("return", next());
              case 5:
                res.status(_httpStatusCodes.StatusCodes.UNAUTHORIZED).json({
                  message: 'Token is not valid, please login again'
                });
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } else {
      res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
        message: 'Auth token is not supplied'
      });
    }
  };
};