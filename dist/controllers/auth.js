"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_AUTH = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _crypto = _interopRequireDefault(require("crypto"));
var _models = require("../models");
var _middlewares = require("../middlewares");
var _utils = require("../utils");
var _dotenv = _interopRequireDefault(require("dotenv"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // * Libraries
_dotenv["default"].config();
var CONTROLLER_AUTH = exports.CONTROLLER_AUTH = {
  signUp: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, name, email, parent, role, password, user, hashedPassword, newUser, tokenPayload, tokens;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, parent = _req$body.parent, role = _req$body.role, password = _req$body.password; // Check if user already exists
            _context.next = 3;
            return _models.User.findOne({
              email: email
            });
          case 3:
            user = _context.sent;
            if (!user) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: 'Email already exists.'
            }));
          case 6:
            _context.next = 8;
            return (0, _utils.generatePassword)(password);
          case 8:
            hashedPassword = _context.sent;
            newUser = new _models.User({
              name: name,
              email: email,
              parent: parent,
              role: role,
              password: hashedPassword
            });
            _context.next = 12;
            return newUser.save();
          case 12:
            if (!(name !== undefined)) {
              _context.next = 20;
              break;
            }
            tokenPayload = {
              _id: newUser._id,
              role: newUser.role // Ensure it's defined
            };
            _context.next = 16;
            return (0, _utils.generateToken)(tokenPayload);
          case 16:
            tokens = _context.sent;
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              data: _objectSpread({
                user: _objectSpread({}, newUser._doc)
              }, tokens),
              message: 'User registered successfully'
            });
            _context.next = 21;
            break;
          case 20:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              data: newUser,
              message: 'successfully added!'
            });
          case 21:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()),
  signIn: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, email, password, user, isAuthenticated, tokenPayload, tokens;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Changed from req.query to req.body
            _context2.next = 3;
            return _models.User.findOne({
              email: email
            }).select('+password');
          case 3:
            user = _context2.sent;
            if (user) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
              message: 'User not found.'
            }));
          case 6:
            _context2.next = 8;
            return (0, _utils.comparePassword)(password, user.password);
          case 8:
            isAuthenticated = _context2.sent;
            if (isAuthenticated) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: 'Incorrect Password or Email.'
            }));
          case 11:
            delete user.password;
            tokenPayload = {
              _id: user._id,
              role: user.role
            };
            _context2.next = 15;
            return (0, _utils.generateToken)(tokenPayload);
          case 15:
            tokens = _context2.sent;
            user.refreshTokens = [tokens.refreshToken];
            _context2.next = 19;
            return user.save();
          case 19:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              data: _objectSpread({
                user: _objectSpread({}, user._doc)
              }, tokens),
              message: 'Logged In Successfully'
            });
          case 20:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()),
  signOut: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var userId, user;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.body.userId;
            _context3.next = 3;
            return _models.User.findById(userId);
          case 3:
            user = _context3.sent;
            if (user) {
              _context3.next = 6;
              break;
            }
            return _context3.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
              message: 'User not found'
            }));
          case 6:
            if (!user) {
              _context3.next = 11;
              break;
            }
            user.refreshTokens = '';
            user.accessToken = '';
            _context3.next = 11;
            return user.save();
          case 11:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              message: 'Logged out successfully'
            });
          case 12:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()),
  updateUser: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var _req$body3, name, email, password, userId, user, oldUser, hashedPassword, tokenPayload, tokens;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, password = _req$body3.password, userId = _req$body3.userId;
            if (!(!userId || !name || !email)) {
              _context4.next = 3;
              break;
            }
            return _context4.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: 'Name, email, and userId are required.'
            }));
          case 3:
            _context4.next = 5;
            return _models.User.findById(userId);
          case 5:
            user = _context4.sent;
            if (user) {
              _context4.next = 8;
              break;
            }
            return _context4.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
              message: 'User not found'
            }));
          case 8:
            if (!(user.email !== email)) {
              _context4.next = 14;
              break;
            }
            _context4.next = 11;
            return _models.User.findOne({
              email: email
            });
          case 11:
            oldUser = _context4.sent;
            if (!oldUser) {
              _context4.next = 14;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              message: "already existed User!"
            }));
          case 14:
            if (!password) {
              _context4.next = 18;
              break;
            }
            _context4.next = 17;
            return (0, _utils.generatePassword)(password);
          case 17:
            hashedPassword = _context4.sent;
          case 18:
            user.name = name, user.email = email, user.password = hashedPassword;
            _context4.next = 21;
            return user.save();
          case 21:
            tokenPayload = {
              _id: user._id,
              role: user.role
            };
            _context4.next = 24;
            return (0, _utils.generateToken)(tokenPayload);
          case 24:
            tokens = _context4.sent;
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              data: _objectSpread({
                user: _objectSpread({}, user._doc)
              }, tokens),
              message: 'User profile successfully updated!'
            });
          case 26:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()),
  getUser: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var userId, users;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.body.userId;
            if (userId) {
              _context5.next = 3;
              break;
            }
            return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: 'userId is required.'
            }));
          case 3:
            _context5.next = 5;
            return _models.User.find({
              parent: userId
            });
          case 5:
            users = _context5.sent;
            if (!(users.length == 0)) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
              message: 'User not found'
            }));
          case 8:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              users: users,
              message: 'User successfully downloaded!'
            });
          case 9:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()),
  deleteUser: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var email;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            email = req.body.email;
            if (email) {
              _context6.next = 3;
              break;
            }
            return _context6.abrupt("return", res.status(404).error({
              message: 'email needed'
            }));
          case 3:
            _context6.prev = 3;
            console.log('email', email);
            _context6.next = 7;
            return _models.User.deleteOne({
              email: email
            });
          case 7:
            return _context6.abrupt("return", res.status(_httpStatusCodes.StatusCodes.OK).json({
              message: "successfully Removed"
            }));
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](3);
            return _context6.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: _context6.t0
            }));
          case 13:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[3, 10]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()),
  forgotPassword: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var email, buffer, token, user, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            email = req.body.email;
            _context7.next = 3;
            return _crypto["default"].randomBytes(20);
          case 3:
            buffer = _context7.sent;
            token = buffer.toString('hex');
            _context7.next = 7;
            return _models.User.findOne({
              email: email
            });
          case 7:
            user = _context7.sent;
            if (user) {
              _context7.next = 10;
              break;
            }
            return _context7.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
              message: 'No account with that email address exists.'
            }));
          case 10:
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            _context7.next = 14;
            return user.save();
          case 14:
            transporter = _nodemailer["default"].createTransport({
              service: 'Gmail',
              auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            mailOptions = {
              to: user.email,
              from: process.env.EMAIL_ADDRESS,
              subject: 'Password Reset',
              text: "You are receiving this because you (or someone else) requested a password reset.\n\n\n        Please click on the following link, or paste it into your browser to complete the process:\n\n\n        ".concat(process.env.FRONTEND_URL, "/reset-password/").concat(token, "\n\n\n        If you did not request this, please ignore this email and your password will remain unchanged.\n")
            };
            _context7.next = 18;
            return transporter.sendMail(mailOptions);
          case 18:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              message: 'Password reset email sent.'
            });
          case 19:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()),
  resetPassword: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var token, password, user, hashedPassword, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            token = req.params.token;
            password = req.body.password;
            _context8.next = 4;
            return _models.User.findOne({
              resetPasswordToken: token,
              resetPasswordExpires: {
                $gt: Date.now()
              }
            });
          case 4:
            user = _context8.sent;
            if (user) {
              _context8.next = 7;
              break;
            }
            return _context8.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: 'Password reset token is invalid or has expired.'
            }));
          case 7:
            _context8.next = 9;
            return (0, _utils.generatePassword)(password);
          case 9:
            hashedPassword = _context8.sent;
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            _context8.next = 15;
            return user.save();
          case 15:
            transporter = _nodemailer["default"].createTransport({
              service: 'Gmail',
              auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            mailOptions = {
              to: user.email,
              from: process.env.EMAIL_ADDRESS,
              subject: 'Your password has been changed',
              text: "Hello,\n\nThis is a confirmation that the password for your account ".concat(user.email, " has just been changed.\n")
            };
            _context8.next = 19;
            return transporter.sendMail(mailOptions);
          case 19:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              message: 'Password has been reset.'
            });
          case 20:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()),
  verifyResetToken: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var token, user;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            token = req.params.token;
            _context9.next = 3;
            return _models.User.findOne({
              resetPasswordToken: token,
              resetPasswordExpires: {
                $gt: Date.now()
              }
            });
          case 3:
            user = _context9.sent;
            if (user) {
              _context9.next = 6;
              break;
            }
            return _context9.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              message: 'Password reset token is invalid or has expired.'
            }));
          case 6:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              message: 'Token is valid.'
            });
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }())
};