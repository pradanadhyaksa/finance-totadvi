"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.v_adminUpdateUser = exports.updateUser = exports.subscriberResetPassword = exports.subscriberAdminResetPassword = exports.initialRegister = exports.createSubscriber = exports.createStripeCheckoutSessionValidation = exports.createSACompanyUser = exports.createRAACompanyUser = exports.createAdminUser = exports.confirmForgotPassword = exports.changeStatus = exports.changeCompanyUserStatusValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _user = require("../utils/user");
var createAdminUser = exports.createAdminUser = function createAdminUser(obj) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    phoneNumber: _joi["default"].string(),
    // country: Joi.string().required(),
    permissions: _joi["default"].array(),
    subscriptionId: _joi["default"].string().required(),
    role: _joi["default"].string().valid(_user.USER_ROLE.CGA, _user.USER_ROLE.SA, _user.USER_ROLE.SAVO, _user.USER_ROLE.RAA, _user.USER_ROLE.RAVO, _user.USER_ROLE.RA),
    picture: _joi["default"].string()
  }).options({
    abortEarly: false
  });
  // .keys({
  //     firstName: Joi.string().required().label('firstName').messages({
  //         'any.required': `Your {#label} is required`,
  //     }),
  //     lastName: Joi.string().required().label('lastName').messages({
  //         'any.required': `Your {#label} is required`,
  //     })
  // })

  return schema.validate(obj);
};
var createSubscriber = exports.createSubscriber = function createSubscriber(obj) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    phoneNumber: _joi["default"].string().required(),
    payment: _joi["default"].string().valid('e-payment', 'invoiced').required(),
    type: _joi["default"].string().when(_joi["default"].ref('payment'), [{
      is: 'invoiced',
      then: _joi["default"].valid('corporate', 'enterprise')
    }]),
    // durationInterval: Joi.string().valid('year', 'month').required(),
    // durationIntervalCount: Joi.number().when(Joi.ref('durationInterval'), [
    //   { is: 'year', then: Joi.valid(1) },
    //   { is: 'month', then: Joi.valid(3, 6) },
    // ]),
    companyAddressDetails: _joi["default"].object().required(),
    countryCode: _joi["default"].string().required(),
    companyName: _joi["default"].string().required(),
    companyAddress: _joi["default"].string().required(),
    companyEmployees: _joi["default"].string().required(),
    picture: _joi["default"].string(),
    inTrial: _joi["default"]["boolean"]()["default"](false)
    // productId: Joi.string().required(),
  }).options({
    abortEarly: false
  });
  // .keys({
  //     firstName: Joi.string().required().label('firstName').messages({
  //         'any.required': `Your {#label} is required`,
  //     }),
  //     lastName: Joi.string().required().label('lastName').messages({
  //         'any.required': `Your {#label} is required`,
  //     })
  // })

  return schema.validate(obj);
};
var createSACompanyUser = exports.createSACompanyUser = function createSACompanyUser(obj) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    phoneNumber: _joi["default"].string().required(),
    role: _joi["default"].string().valid(_user.USER_ROLE.SA, _user.USER_ROLE.SAVO, _user.USER_ROLE.RAA, _user.USER_ROLE.RAVO, _user.USER_ROLE.RA).required(),
    subscriptionId: _joi["default"].string().required(),
    picture: _joi["default"].string()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var createRAACompanyUser = exports.createRAACompanyUser = function createRAACompanyUser(obj) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    phoneNumber: _joi["default"].string().required(),
    role: _joi["default"].string().valid(_user.USER_ROLE.RA, _user.USER_ROLE.RAVO, _user.USER_ROLE.RAA).required(),
    subscriptionId: _joi["default"].string().required(),
    picture: _joi["default"].string()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var changeCompanyUserStatusValidation = exports.changeCompanyUserStatusValidation = function changeCompanyUserStatusValidation(obj) {
  var schema = _joi["default"].object({
    status: _joi["default"].number().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var createStripeCheckoutSessionValidation = exports.createStripeCheckoutSessionValidation = function createStripeCheckoutSessionValidation(obj) {
  var schema = _joi["default"].object({
    priceId: _joi["default"].string().required(),
    customer: _joi["default"].string().required(),
    sanitizeCompanyName: _joi["default"].string().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var subscriberResetPassword = exports.subscriberResetPassword = function subscriberResetPassword(obj) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var subscriberAdminResetPassword = exports.subscriberAdminResetPassword = function subscriberAdminResetPassword(obj) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    userId: _joi["default"].string().email().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var changeStatus = exports.changeStatus = function changeStatus(obj) {
  var schema = _joi["default"].object({
    status: _joi["default"].number().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var initialRegister = exports.initialRegister = function initialRegister(obj) {
  var schema = _joi["default"].object({
    countryCode: _joi["default"].string().required(),
    cognitoSub: _joi["default"].string().required(),
    emailVerified: _joi["default"].bool().required(),
    companyName: _joi["default"].string().required(),
    companyAddress: _joi["default"].string().required(),
    companyAddressDetails: _joi["default"].object().required(),
    companyEmployess: _joi["default"].string().required(),
    phoneNumber: _joi["default"].string().required(),
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    email: _joi["default"].string().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var confirmForgotPassword = exports.confirmForgotPassword = function confirmForgotPassword(obj) {
  var schema = _joi["default"].object({
    code: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var v_adminUpdateUser = exports.v_adminUpdateUser = function v_adminUpdateUser(obj) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string(),
    lastName: _joi["default"].string(),
    phoneNumber: _joi["default"].string(),
    isRoleUpdate: _joi["default"].bool(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    permissions: _joi["default"].array(),
    role: _joi["default"].string().valid(_user.USER_ROLE.CGA, _user.USER_ROLE.SA, _user.USER_ROLE.SAVO, _user.USER_ROLE.RAA, _user.USER_ROLE.RAVO, _user.USER_ROLE.RA)
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};
var updateUser = exports.updateUser = function updateUser(obj) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string(),
    lastName: _joi["default"].string(),
    phoneNumber: _joi["default"].string()
  }).options({
    abortEarly: false
  });
  return schema.validate(obj);
};