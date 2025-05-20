"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsConfig = void 0;
var corsConfig = exports.corsConfig = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  allowedHeaders: ['Authorization', 'Content-Type', 'Origin', 'Accept', 'Access-Control-Allow-Request-Method']
};