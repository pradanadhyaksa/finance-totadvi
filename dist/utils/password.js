"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePassword = exports.comparePassword = void 0;
var _lodash = _interopRequireWildcard(require("lodash"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _generatePassword = _interopRequireDefault(require("generate-password"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var saltRounds = 10;

// export const generateCognitoPassword = () => {
//   const symbol = '@'
//   const randomPosition = Math.floor(Math.random() * 9)
//   const password = generator.generate({
//     length: 8,
//     numbers: true,
//     symbols: false,
//     lowercase: true,
//     uppercase: true,
//     strict: true,
//   })
//   const newPassword = [password.slice(0, randomPosition), symbol, password.slice(randomPosition)].join('')
//   console.log('PASSWORD GENERATED', newPassword)
//   return newPassword
// }

var generatePassword = exports.generatePassword = function generatePassword(password) {
  return new Promise(function (resolve, reject) {
    if ((0, _lodash.isEmpty)(password)) {
      password = Array(10).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      }).join('');
    }

    // password = '$Google123' // Comment this line to make passwords dynamic
    // console.log('Password For Newly Added User:', password)

    _bcrypt["default"].genSalt(saltRounds, function (err, salt) {
      if (err) reject(err);
      _bcrypt["default"].hash(password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};
var hashPassword = function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].genSalt(saltRounds, function (err, salt) {
      if (err) reject(err);
      _bcrypt["default"].hash(password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

// ? @params password=The password user typed, hash=The password stored in DB
var comparePassword = exports.comparePassword = function comparePassword(password, hash) {
  return new Promise(function (resolve, reject) {
    if ((0, _lodash.isEmpty)(password) || (0, _lodash.isEmpty)(hash)) return resolve(false);
    _bcrypt["default"].compare(password, hash).then(function (isMatch) {
      console.log(isMatch);
      if (isMatch) return resolve(true);else return resolve(false);
    });
  });
};