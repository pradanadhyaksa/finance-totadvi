"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRevenueData = exports.revenueSchema = exports.Revenue = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _joi = _interopRequireDefault(require("joi"));
var _this = void 0;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var revenueSchema = exports.revenueSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dateFlag: {
    type: Number,
    required: true
  },
  data: [{
    type: [_mongoose.Schema.Types.Mixed],
    required: true,
    validate: {
      validator: function validator(v) {
        var _validateRevenueData = validateRevenueData({
            data: v,
            userId: this.userId,
            date: this.date,
            dateFlag: this.dateFlag
          }),
          error = _validateRevenueData.error;
        return !error;
      },
      message: function message(props) {
        var _validateRevenueData2 = validateRevenueData({
            data: props.value,
            userId: _this.userId,
            date: _this.date,
            dateFlag: _this.dateFlag
          }),
          error = _validateRevenueData2.error;
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
var validateRevenueData = exports.validateRevenueData = function validateRevenueData(obj) {
  var schema = _joi["default"].object({
    userId: _joi["default"].string().required(),
    date: _joi["default"].string().required(),
    dateFlag: _joi["default"].number().required(),
    data: _joi["default"].array().items(_joi["default"].array().ordered(_joi["default"].string().required(), _joi["default"].string().required(), _joi["default"].number().required(), _joi["default"].string().required()).length(4)).required().messages({
      'array.base': 'Data must be an array of arrays.',
      'array.includes': 'Each data entry must follow the structure: [String, String, Number, String].'
    })
  }).options({
    abortEarly: false
  }); // Return all validation errors

  return schema.validate(obj);
};
var Revenue = exports.Revenue = (0, _mongoose.model)('Revenue', revenueSchema);