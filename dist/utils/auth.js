"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTOTPToken = exports.generateToken = exports.generateOTToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
// payload can be userID, email or other user details
var generateToken = exports.generateToken = function generateToken(payload) {
  return new Promise(function (resolve, reject) {
    var tokens = {};
    tokens.accessToken = _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d'
    }); //1m,1d,1y
    tokens.refreshToken = _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '60m'
    }); // 1m,1d,1y

    resolve(tokens);
  });
};

// payload can be userID, email or other user details
var generateOTToken = exports.generateOTToken = function generateOTToken(payload) {
  return new Promise(function (resolve, reject) {
    var token = _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    });
    resolve(token);
  });
};
var verifyTOTPToken = exports.verifyTOTPToken = function verifyTOTPToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};