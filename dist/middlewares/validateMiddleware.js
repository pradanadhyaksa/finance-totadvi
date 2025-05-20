"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMiddleware = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _httpStatusCodes = require("http-status-codes");
var _lodash = _interopRequireWildcard(require("lodash"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var validateMiddleware = exports.validateMiddleware = function validateMiddleware(validator) {
  return function (req, res, next) {
    var _validator = validator(req.body),
      error = _validator.error;
    if (!(0, _lodash.isEmpty)(error)) {
      var messageError = error.message.replace(/\"/g, '');
      var fields = error.details.map(function (item) {
        return (0, _defineProperty2["default"])({}, item.context.key || item.context.label, item === null || item === void 0 ? void 0 : item.message.replace(/\"/g, ''));
      });
      var message = {
        error: messageError,
        fields: fields
      };
      console.log('[💫 validation]: ', message);
      return res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send(message);
    }
    next();
  };
};