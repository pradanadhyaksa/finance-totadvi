"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateZealUsers = exports.seedData = exports.mongodbOptions = exports.insertExercise = exports.insertBadges = exports.deleteCGAAdminById = exports.createZealAdmin = exports.connectMongoDB = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _lodash = require("lodash");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _models = require("../models");
var _services = require("../services");
var _utils = require("../utils");
// Suppress Mongoose Deprecation Warning
_mongoose["default"].set('strictQuery', true);
var mongodbOptions = exports.mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  // Increase the timeout from the default 30000ms
  autoIndex: true,
  maxPoolSize: 1000
};
var seedData = exports.seedData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var adminUserDetails;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('[🌱 seeding]');
          adminUserDetails = {
            firstName: 'fatik',
            lastName: 'khan',
            email: process.env.SYSTEM_ADMIN_EMAIL,
            // change only email whenever you want to create another SSA
            role: {
              name: _utils.SYSTEM_STAFF_ROLE.SSA,
              shortName: (0, _utils.getRoleShortName)(_utils.USER_TYPES.SYS, _utils.SYSTEM_STAFF_ROLE.SSA)
            },
            // 'System Admin'
            address: '',
            password: '$Google123',
            userTypes: [_utils.USER_TYPES.SYS]
          }; // await createCGAAdmin({ adminUserDetails })
          // await createZealAdmin({ adminUserDetails })
          // await createBCSAdmin({ adminUserDetails }) // Create Biddi Cars System Admin
          // updateZealUsers()
          // await insertBadges(badges)
          // await insertExercise(exercise)
          console.log('[🌱 seeded successfully]');
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function seedData() {
    return _ref.apply(this, arguments);
  };
}();
var deleteCGAAdminById = exports.deleteCGAAdminById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var adminRootUser, userRoleDoc, cognitoResponse, deletedUserDoc, deletedDoc;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _models.User.findById(id);
        case 2:
          adminRootUser = _context2.sent;
          _context2.next = 5;
          return _models.User_SubscriptionRole.findOne({
            user: id
          });
        case 5:
          userRoleDoc = _context2.sent;
          console.log('adminRootUser', adminRootUser, 'userRoleDoc', userRoleDoc);
          // Delete user from cognito
          _context2.next = 9;
          return (0, _services.adminDeleteCognitoUser)({
            email: adminRootUser.email,
            sub: adminRootUser.cognitoSub
          });
        case 9:
          cognitoResponse = _context2.sent;
          console.log('DELETED COGNITO', cognitoResponse);
          // Delete user doc
          _context2.next = 13;
          return _models.User.deleteOne({
            _id: id
          });
        case 13:
          deletedUserDoc = _context2.sent;
          console.log('DELETED USER', deletedUserDoc);
          // Delete user role doc
          _context2.next = 17;
          return _models.User_SubscriptionRole.deleteOne({
            user: id
          });
        case 17:
          deletedDoc = _context2.sent;
          console.log('DELETED deletedDoc', deletedDoc);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function deleteCGAAdminById(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var createZealAdmin = exports.createZealAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var adminUserDetails, email, firstName, lastName, userTypes, role, password, userExists, hasedPassword, newUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          adminUserDetails = _ref3.adminUserDetails;
          console.log('[🌱 seeding-admin-data]');
          email = adminUserDetails.email, firstName = adminUserDetails.firstName, lastName = adminUserDetails.lastName, userTypes = adminUserDetails.userTypes, role = adminUserDetails.role, password = adminUserDetails.password;
          _context3.next = 5;
          return _models.User.findOne({
            email: email
          });
        case 5:
          userExists = _context3.sent;
          if ((0, _lodash.isEmpty)(userExists)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return");
        case 8:
          _context3.next = 10;
          return (0, _utils.generatePassword)(password);
        case 10:
          hasedPassword = _context3.sent;
          _context3.next = 13;
          return (0, _services.createUser)({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            userTypes: userTypes,
            accountType: 'Zeal-Admin-Account',
            password: hasedPassword
          });
        case 13:
          newUser = _context3.sent;
          console.log('newUser', newUser);
          _context3.next = 17;
          return newUser.save();
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createZealAdmin(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var updateZealUsers = exports.updateZealUsers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var updateResult;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          console.log('[🌱 seeding-admin-data]');
          _context4.next = 3;
          return _models.Challenge.deleteMany({
            challengeCreator: '66a8a5a384b1c19e93dce0fd'
          });
        case 3:
          updateResult = _context4.sent;
          console.log('updateResult', updateResult);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function updateZealUsers() {
    return _ref5.apply(this, arguments);
  };
}();
var insertBadges = exports.insertBadges = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(data) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log('[🌱 seeding-exercises]');
          _context5.next = 3;
          return _models.Badge.insertMany(data);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function insertBadges(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
var insertExercise = exports.insertExercise = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(data) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log('[🌱 seeding-exercises]');
          _context6.next = 3;
          return _models.Exercise.insertMany(data);
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function insertExercise(_x4) {
    return _ref7.apply(this, arguments);
  };
}();
var connectMongoDB = exports.connectMongoDB = function connectMongoDB() {
  _mongoose["default"].connect(process.env.MONGO_URI, mongodbOptions
  // , {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // }
  );
  var db = _mongoose["default"].connection;
  db.on('error', console.error.bind(console, '[❌ database] Connection error'));
  db.once('open', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log('[🔌 database] Connected');
          try {
            // await seedData()
          } catch (error) {
            console.error('[🌱 seeding] Error', error);
          }
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
};