"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegistration = exports.userSchema = exports.User = void 0;
var _mongoose = require("mongoose");
var _crypto = _interopRequireDefault(require("crypto"));
var _joi = _interopRequireDefault(require("joi"));
// User Schema
var userSchema = exports.userSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  parent: {
    type: String
  },
  role: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  refreshTokens: [String],
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  versionKey: false,
  timestamps: true
});

// Token Generation Methods
userSchema.methods.createEmailVerifyToken = function () {
  var emailToken = _crypto["default"].randomBytes(32).toString('hex');
  this.emailToken = _crypto["default"].createHash('sha256').update(emailToken).digest('hex');
  return emailToken;
};
userSchema.methods.createPasswordResetToken = function () {
  var resetToken = _crypto["default"].randomBytes(32).toString('hex');
  this.passwordResetToken = _crypto["default"].createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Joi Validation
var validateRegistration = exports.validateRegistration = function validateRegistration(obj) {
  var schema = _joi["default"].object({
    name: _joi["default"].string(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    password: _joi["default"].string().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var User = exports.User = (0, _mongoose.model)('User', userSchema);