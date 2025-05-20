"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTimeToSeconds = exports.USER_TYPES = exports.USER_LEVELS = exports.SYSTEM_USER_ROLE = exports.SYSTEM_STAFF_ROLE = exports.DOC_STATUS = exports.CHALLENGE_STATUS = void 0;
exports.getCurrentDayName = getCurrentDayName;
exports.getDateForDay = void 0;
exports.getDayName = getDayName;
exports.getRoleShortName = exports.getRoleByValue = exports.getKeyByValue = void 0;
exports.getStartOfDayISO = getStartOfDayISO;
exports.getStatusByValue = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var DOC_STATUS = exports.DOC_STATUS = {
  active: 1,
  inactive: 2,
  archived: 3,
  deleted: 4
};
var getKeyByValue = exports.getKeyByValue = function getKeyByValue(object, value) {
  return Object.keys(object).find(function (key) {
    return object[key] === value;
  });
};
var getStatusByValue = exports.getStatusByValue = function getStatusByValue(value) {
  return getKeyByValue(USER_STATUS, value);
};
var getRoleByValue = exports.getRoleByValue = function getRoleByValue(value) {
  return getKeyByValue(USER_ROLE, value);
};

// Biddi Cars Configs

var CHALLENGE_STATUS = exports.CHALLENGE_STATUS = {
  LIV: 'live',
  CLT: 'completed'
};
var USER_LEVELS = exports.USER_LEVELS = {
  BEG: 'Beginner',
  INT: 'Intermediate',
  FN: 'Fitness Novice',
  FP: 'Fitness Pro',
  EV: 'Expert Verified'
};
var USER_TYPES = exports.USER_TYPES = {
  SYS: 'System',
  USR: 'User'
};
var SYSTEM_STAFF_ROLE = exports.SYSTEM_STAFF_ROLE = {
  SSA: 'System Admin'
};
var SYSTEM_USER_ROLE = exports.SYSTEM_USER_ROLE = {
  USR: 'Zeal User'
};
var getRoleShortName = exports.getRoleShortName = function getRoleShortName(userType, role) {
  if (userType == USER_TYPES.SYS) {
    return Object.keys(SYSTEM_STAFF_ROLE).find(function (k) {
      return SYSTEM_STAFF_ROLE[k] === role;
    });
  } else {
    return Object.keys(SYSTEM_USER_ROLE).find(function (k) {
      return SYSTEM_USER_ROLE[k] === role;
    });
  }
};
function getCurrentDayName() {
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var currentDate = new Date();
  return daysOfWeek[currentDate.getDay()];
}
var getDateForDay = exports.getDateForDay = function getDateForDay(startDate, targetDay) {
  var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var startDayIndex = new Date(startDate).getDay();
  var targetDayIndex = dayNames.indexOf(targetDay.toLowerCase());

  // Calculate the difference in days
  var dayDifference = targetDayIndex - startDayIndex;
  if (dayDifference < 0) {
    dayDifference += 7;
  }

  // Calculate the target date
  var targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + dayDifference);
  return targetDate.toISOString();
};
function getStartOfDayISO(date) {
  var localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return localDate.toLocaleDateString('en-CA');
}
function getDayName(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long'
  }).toLowerCase();
}
var convertTimeToSeconds = exports.convertTimeToSeconds = function convertTimeToSeconds(timeString) {
  var _timeString$split$map = timeString.split(':').map(Number),
    _timeString$split$map2 = (0, _slicedToArray2["default"])(_timeString$split$map, 3),
    hours = _timeString$split$map2[0],
    minutes = _timeString$split$map2[1],
    seconds = _timeString$split$map2[2];
  return hours * 3600 + minutes * 60 + seconds;
};