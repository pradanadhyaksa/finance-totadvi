"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _ejs = _interopRequireDefault(require("ejs"));
var _htmlToText = require("html-to-text");
var _path = _interopRequireDefault(require("path"));
var _misc = require("./misc");
// * Libraries
// const nodemailerSendgrid = require('nodemailer-sendgrid');
var Email = exports["default"] = /*#__PURE__*/function () {
  function Email(user) {
    (0, _classCallCheck2["default"])(this, Email);
    this.to = user === null || user === void 0 ? void 0 : user.email;
    this.from = "".concat(process.env.CLIENT_NAME, " <").concat(process.env.EMAIL_FROM, ">");
  }
  return (0, _createClass2["default"])(Email, [{
    key: "newTransport",
    value: function newTransport() {
      // // if(process.env.NODE_ENV === 'production'){
      //     // Sendgrid
      // // const transport = nodemailer.createTransport(
      // //   nodemailerSendgrid({
      //  //     apiKey: 'your API KEY HERE'
      // //   })
      // // );
      // // }

      var smtpTransport = _nodemailer["default"].createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      return smtpTransport;
    }
  }, {
    key: "configureMailOptions",
    value: function () {
      var _configureMailOptions = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var template, subject, emailProps, to, mailOptions, error, loginLink, res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              template = _ref.template, subject = _ref.subject, emailProps = _ref.emailProps;
              to = emailProps.toMultiple ? emailProps.toMultiple : this.to;
              if (!emailProps.serverError) {
                _context.next = 6;
                break;
              }
              error = emailProps.error;
              mailOptions = {
                from: this.from,
                to: to,
                subject: subject,
                html: error,
                text: (0, _htmlToText.htmlToText)(error)
              };
              return _context.abrupt("return", mailOptions);
            case 6:
              loginLink = (0, _misc.getLoginLinkByEnv)();
              emailProps.loginLink = loginLink;
              console.log('EMAIL PROPS', emailProps);
              _context.next = 11;
              return _ejs["default"].renderFile(_path["default"].join(__dirname, "../templates/".concat(template, ".ejs")), {
                emailProps: emailProps,
                subject: subject
              });
            case 11:
              res = _context.sent;
              mailOptions = {
                from: this.from,
                to: to,
                subject: subject,
                html: res,
                text: (0, _htmlToText.htmlToText)(res)
              };
              emailProps.attachments ? mailOptions['attachments'] = emailProps.attachments : null;
              return _context.abrupt("return", mailOptions);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function configureMailOptions(_x) {
        return _configureMailOptions.apply(this, arguments);
      }
      return configureMailOptions;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(template, subject, emailProps) {
        var mailOptions;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.configureMailOptions({
                template: template,
                subject: subject,
                emailProps: emailProps
              });
            case 3:
              mailOptions = _context2.sent;
              _context2.prev = 4;
              _context2.next = 7;
              return this.newTransport().sendMail(mailOptions);
            case 7:
              console.log("\uD83D\uDCE7 Email sent successfully to:".concat(mailOptions.to, " subject:").concat(subject));
              _context2.next = 13;
              break;
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](4);
              console.log("\u274E Failed to send mail: ".concat(_context2.t0));
            case 13:
              _context2.next = 18;
              break;
            case 15:
              _context2.prev = 15;
              _context2.t1 = _context2["catch"](0);
              console.log("\u274E Something went wrong in ejs render: ".concat(_context2.t1));
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 15], [4, 10]]);
      }));
      function send(_x2, _x3, _x4) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "sendServerError",
    value: function () {
      var _sendServerError = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(arg) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.send(null, "".concat(arg !== null && arg !== void 0 && arg.isDevServer ? 'DEV' : 'PROD', " - ").concat(process.env.CLIENT_NAME, " : server error"), arg);
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function sendServerError(_x5) {
        return _sendServerError.apply(this, arguments);
      }
      return sendServerError;
    }()
  }, {
    key: "sendForgotPassword",
    value: function () {
      var _sendForgotPassword = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(arg) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.send('forgot-password', 'Reset code', arg);
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function sendForgotPassword(_x6) {
        return _sendForgotPassword.apply(this, arguments);
      }
      return sendForgotPassword;
    }()
  }, {
    key: "welcomeToZeal",
    value: function () {
      var _welcomeToZeal = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(arg) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.send('welcome-to-zeal', 'Welcome to Zeal Fitness App', arg);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function welcomeToZeal(_x7) {
        return _welcomeToZeal.apply(this, arguments);
      }
      return welcomeToZeal;
    }()
  }, {
    key: "registerAccount",
    value: function () {
      var _registerAccount = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(arg) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.send('register', 'Registration Code', arg);
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function registerAccount(_x8) {
        return _registerAccount.apply(this, arguments);
      }
      return registerAccount;
    }()
  }]);
}();