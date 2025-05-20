"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_SUBSCRIPTION = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _middlewares = require("../middlewares");
var _stripe = _interopRequireDefault(require("stripe"));
var stripe = new _stripe["default"](process.env.STRIPE_SECRET_KEY);
var CONTROLLER_SUBSCRIPTION = exports.CONTROLLER_SUBSCRIPTION = {
  create: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, email, priceId, customers, customer, subscriptions, session;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, priceId = _req$body.priceId; // Check if customer already exists
            _context.next = 4;
            return stripe.customers.list({
              email: email
            });
          case 4:
            customers = _context.sent;
            if (!customers.data.length) {
              _context.next = 14;
              break;
            }
            customer = customers.data[0];
            _context.next = 9;
            return stripe.subscriptions.list({
              customer: customer.id,
              status: 'active'
            });
          case 9:
            subscriptions = _context.sent;
            if (!subscriptions.data.length) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", res.status(400).json({
              error: 'Subscription already exists!'
            }));
          case 12:
            _context.next = 17;
            break;
          case 14:
            _context.next = 16;
            return stripe.customers.create({
              email: email
            });
          case 16:
            customer = _context.sent;
          case 17:
            _context.next = 19;
            return stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              mode: "subscription",
              customer: customer.id,
              line_items: [{
                price: priceId,
                quantity: 1
              }],
              success_url: 'https://fpatotadvi-b53f67880f53.herokuapp.com',
              cancel_url: 'https://fpatotadvi-b53f67880f53.herokuapp.com'
            });
          case 19:
            session = _context.sent;
            res.json({
              url: session.url
            });
            _context.next = 27;
            break;
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            console.error('Stripe Checkout Error:', _context.t0);
            res.status(500).json({
              message: 'Server error',
              error: _context.t0.message
            });
          case 27:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 23]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()),
  update: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, email, priceId, customers, customer, subscriptions, subscription;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, priceId = _req$body2.priceId;
            _context2.next = 4;
            return stripe.customers.list({
              email: email
            });
          case 4:
            customers = _context2.sent;
            if (customers.data.length) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              error: "Customer not found"
            }));
          case 7:
            customer = customers.data[0];
            _context2.next = 10;
            return stripe.subscriptions.list({
              customer: customer.id,
              status: 'active'
            });
          case 10:
            subscriptions = _context2.sent;
            if (subscriptions.data.length) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              error: "No active subscription found"
            }));
          case 13:
            subscription = subscriptions.data[0];
            _context2.next = 16;
            return stripe.subscriptions.update(subscription.id, {
              items: [{
                id: subscription.items.data[0].id,
                price: priceId
              }],
              proration_behavior: "create_prorations",
              // immediately attempt charge to user 
              payment_behavior: "error_if_incomplete" // ensure subscription is only update if payment is successful
            });
          case 16:
            return _context2.abrupt("return", res.json({
              success: true,
              message: "Subscription upgraded successfully!",
              subscription: priceId
            }));
          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context2.t0.message
            });
          case 22:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 19]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()),
  getSubscription: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var email, customers, customer, subscriptions, subscription, currentPriceId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            email = req.body.email;
            _context3.next = 4;
            return stripe.customers.list({
              email: email
            });
          case 4:
            customers = _context3.sent;
            if (customers.data.length) {
              _context3.next = 7;
              break;
            }
            return _context3.abrupt("return", res.status(404).json({
              error: "Customer not found"
            }));
          case 7:
            customer = customers.data[0];
            _context3.next = 10;
            return stripe.subscriptions.list({
              customer: customer.id
            });
          case 10:
            subscriptions = _context3.sent;
            if (subscriptions.data.length) {
              _context3.next = 13;
              break;
            }
            return _context3.abrupt("return", res.status(404).json({
              error: "No active subscription found"
            }));
          case 13:
            subscription = subscriptions.data[0];
            currentPriceId = subscription.items.data[0].price.id;
            return _context3.abrupt("return", res.json({
              message: 'Successfully doload',
              plan: currentPriceId
            }));
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context3.t0.message
            });
          case 21:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 18]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()),
  cancel: (0, _middlewares.asyncMiddleware)(/*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var email, customers, customer, subscriptions, subscription;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            email = req.body.email;
            _context4.next = 4;
            return stripe.customers.list({
              email: email
            });
          case 4:
            customers = _context4.sent;
            if (customers.data.length) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", res.status(404).json({
              error: "Customer not found"
            }));
          case 7:
            customer = customers.data[0];
            _context4.next = 10;
            return stripe.subscriptions.list({
              customer: customer.id,
              status: "active"
            });
          case 10:
            subscriptions = _context4.sent;
            if (subscriptions.data.length) {
              _context4.next = 13;
              break;
            }
            return _context4.abrupt("return", res.status(404).json({
              error: "No active subscription found"
            }));
          case 13:
            subscription = subscriptions.data[0];
            _context4.next = 16;
            return stripe.subscriptions.del(subscription.id);
          case 16:
            return _context4.abrupt("return", res.json({
              message: "Subscription canceled successfully!"
            }));
          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'Server error',
              error: _context4.t0.message
            });
          case 22:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 19]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }())
};