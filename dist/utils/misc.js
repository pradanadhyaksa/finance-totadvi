"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAssessmentIdFromReportKey = exports.escapeRegex = exports.bufferToStream = void 0;
exports.fRemainingDays = fRemainingDays;
exports.filterReportsByAssessmentIds = exports.filterNullUndefined = exports.filterDeletedItem = void 0;
exports.formatToCurrency = formatToCurrency;
exports.toObjectId = exports.sortByLatestDate = exports.sortByFirstDate = exports.removeSeperatorKey = exports.getShortName = exports.getSanitizeCompanyName = exports.getRandomWholeNumber = exports.getRandomString = exports.getNewInvoiceNumber = exports.getLoginLinkByEnv = exports.getFacebookUserData = exports.getEndDateByDurationYear = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _lodash = require("lodash");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = require("./user");
var _stream = require("stream");
var _ordersidGenerator = _interopRequireDefault(require("ordersid-generator"));
var _numeral = _interopRequireDefault(require("numeral"));
var getNewInvoiceNumber = exports.getNewInvoiceNumber = function getNewInvoiceNumber() {
  // return OrderID('long')
  return (0, _ordersidGenerator["default"])('short', process.env.CLIENT_NAME.replace(' ', ''));
};
function formatToCurrency(number) {
  return (0, _numeral["default"])(number).format('$0,0.00');
}
var getRandomWholeNumber = exports.getRandomWholeNumber = function getRandomWholeNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
function fRemainingDays(_ref) {
  var endDate = _ref.endDate,
    _ref$startDate = _ref.startDate,
    startDate = _ref$startDate === void 0 ? Date.now() : _ref$startDate;
  var countDownDate = new Date(endDate).getTime();
  var now = new Date(startDate).getTime();
  var timeleft = countDownDate - now;
  var days = Math.ceil(timeleft / (1000 * 60 * 60 * 24));
  return days;
}
var bufferToStream = exports.bufferToStream = function bufferToStream(binary) {
  var readableInstanceStream = new _stream.Readable({
    read: function read() {
      this.push(binary);
      this.push(null);
    }
  });
  return readableInstanceStream;
};
var removeSeperatorKey = exports.removeSeperatorKey = function removeSeperatorKey(fileKey) {
  var seperator = '-seperator-';
  var transformed = fileKey.includes(seperator) ? fileKey.slice(fileKey.indexOf(seperator) + seperator.length, fileKey.length) : fileKey;
  return transformed;
};
var filterNullUndefined = exports.filterNullUndefined = function filterNullUndefined(arr) {
  var newArray = arr.filter(function (a) {
    return a !== undefined && a !== null && !isNaN(a);
  });
  return newArray;
};
var getFacebookUserData = exports.getFacebookUserData = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(access_token) {
    var _yield$axios$get, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _axios["default"].get('https://graph.facebook.com/me', {
            params: {
              fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(','),
              access_token: access_token
            }
          });
        case 2:
          _yield$axios$get = _context.sent;
          data = _yield$axios$get.data;
          return _context.abrupt("return", data);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getFacebookUserData(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var getRandomString = exports.getRandomString = function getRandomString() {
  var random = Math.random().toString(36);
  return random.slice(2, random.length);
};
var toObjectId = exports.toObjectId = function toObjectId(id) {
  return _mongoose["default"].Types.ObjectId(id);
};
var getLoginLinkByEnv = exports.getLoginLinkByEnv = function getLoginLinkByEnv() {
  return process.env.CLOUD === 'DEV_CLOUD' ? process.env.DOMAIN_FRONT_DEV : process.env.DOMAIN_PROD;
};
var getSanitizeCompanyName = exports.getSanitizeCompanyName = function getSanitizeCompanyName(company, countryCode) {
  console.log('company, countryCode', company, countryCode);
  return (countryCode === null || countryCode === void 0 ? void 0 : countryCode.toLowerCase()) + '-' + (company === null || company === void 0 ? void 0 : company.toLowerCase().replace(/[^a-z]/gi, ''));
};
var filterDeletedItem = exports.filterDeletedItem = function filterDeletedItem(arr) {
  return arr.filter(function (item) {
    return item.status === _user.USER_STATUS.active;
  });
};
var escapeRegex = exports.escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
var getEndDateByDurationYear = exports.getEndDateByDurationYear = function getEndDateByDurationYear(duration) {
  var endDate = new Date();
  if (duration !== '1 year') endDate.setFullYear(endDate.getFullYear() + 2);else endDate.setFullYear(endDate.getFullYear() + 1);
  return endDate;
};
var sortByLatestDate = exports.sortByLatestDate = function sortByLatestDate(array, key) {
  return array.sort(function (a, b) {
    return new Date(b[key]) - new Date(a[key]);
  });
};
var extractAssessmentIdFromReportKey = exports.extractAssessmentIdFromReportKey = function extractAssessmentIdFromReportKey(key) {
  var arraySplited = key.split('-');
  var keyContainsId = arraySplited.length === 5;
  if (keyContainsId) {
    var companyAndId = arraySplited[1];
    var id = companyAndId.slice(companyAndId.indexOf('/') + 1, companyAndId.length);
    return id;
  }
};
var filterReportsByAssessmentIds = exports.filterReportsByAssessmentIds = function filterReportsByAssessmentIds(array) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return array === null || array === void 0 ? void 0 : array.filter(function (item) {
    var idFromKey = extractAssessmentIdFromReportKey(item === null || item === void 0 ? void 0 : item.Key);
    return ids.indexOf(idFromKey) !== -1;
  });
};
var sortByFirstDate = exports.sortByFirstDate = function sortByFirstDate(array, key) {
  return array.sort(function (a, b) {
    return new Date(a[key]) - new Date(b[key]);
  });
};
var getShortName = exports.getShortName = function getShortName(string) {
  if ((0, _lodash.isEmpty)(string)) return '';
  var shortName = string.slice(0, 2);
  var splittedName = string.split(' ');
  if (splittedName.length >= 2) shortName = splittedName[0].charAt(0) + splittedName[splittedName.length - 1].replace('&\r\n', '').charAt(0);
  return shortName.toUpperCase();
};