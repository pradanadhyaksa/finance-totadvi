"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCOAData = exports.coaSchema = exports.COA = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _joi = _interopRequireDefault(require("joi"));
var _this = void 0;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var coaSchema = exports.coaSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  data: [{
    type: [_mongoose.Schema.Types.Mixed],
    required: true,
    validate: {
      validator: function validator(v) {
        var _validateCOAData = validateCOAData({
            data: v,
            userId: this.userId,
            date: this.date
          }),
          error = _validateCOAData.error;
        return !error;
      },
      message: function message(props) {
        var _validateCOAData2 = validateCOAData({
            data: props.value,
            userId: _this.userId,
            date: _this.date
          }),
          error = _validateCOAData2.error;
        return (error === null || error === void 0 ? void 0 : error.details.map(function (err) {
          return err.message;
        }).join(', ')) || 'Invalid data structure.';
      }
    }
  }]
}, {
  versionKey: false,
  timestamps: true
});
var validateCOAData = exports.validateCOAData = function validateCOAData(obj) {
  var schema = _joi["default"].object({
    userId: _joi["default"].string().required(),
    data: _joi["default"].array().items(_joi["default"].array().ordered(_joi["default"].string().required(), _joi["default"].string().required(), _joi["default"].string().required(), _joi["default"].string().required(), _joi["default"].string().required()).length(5)).required().messages({
      'array.base': 'Data must be an array of arrays.',
      'array.includes': 'Each data entry must follow the structure: [String, String, String, String, String].'
    })
  }).options({
    abortEarly: false
  }); // Return all validation errors

  return schema.validate(obj);
};
var COA = exports.COA = (0, _mongoose.model)('COA', coaSchema);