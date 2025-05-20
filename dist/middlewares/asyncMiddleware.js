"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncMiddleware = void 0;
var asyncMiddleware = exports.asyncMiddleware = function asyncMiddleware(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))["catch"](next);
  };
};