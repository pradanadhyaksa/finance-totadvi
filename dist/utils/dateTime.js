"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secsToHours = exports.getDate = void 0;
var _dateFns = require("date-fns");
var _lodash = require("lodash");
var getDate = exports.getDate = function getDate(_ref) {
  var _ref$date = _ref.date,
    date = _ref$date === void 0 ? Date.now() : _ref$date,
    _ref$formatString = _ref.formatString,
    formatString = _ref$formatString === void 0 ? 'yyyy.MM.dd' : _ref$formatString;
  return (0, _dateFns.format)(new Date(date), formatString);
};
var secsToHours = exports.secsToHours = function secsToHours(s) {
  var d = Number(s);
  return Math.floor(d / 3600);
};