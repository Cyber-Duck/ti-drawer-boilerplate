/*!
 * https://github.com/crobinson42/string-format-validation
 * Copyright (c) 2016 Cory Robinson
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var validator = require('validator');
var Mask = _interopDefault(require('string-mask'));

var StringFormatValidation = function StringFormatValidation(rules, val) {
  var __validArgs = __validateArguments(rules, val);
  if (__validArgs) {
    throw new Error(__validArgs);
  }

  var returnVal = void 0;

  // if val is an obj iterate it's keys and look for matching rules
  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
    returnVal = {};
    for (var _key in val) {
      returnVal[_key] = dowork(rules[_key], val[_key]);
    }
  } else {
    returnVal = dowork(rules, val);
  }

  function dowork() {
    var rules = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var val = arguments[1];

    var _valid = void 0;
    var _formatted = void 0;

    // check for format key in rules, first
    if (rules.format) {
      _formatted = _format(rules.format, val);
    }

    // if rule 'required' === false then it's considered 'valid' (we don't validate)
    if (rules.require === false) {
      _valid = true;
    } else {
      _valid = _validate(rules, val);
    }

    if (_formatted) {
      return {
        format: _formatted,
        valid: _valid
      };
    } else {
      return _valid;
    }
  }

  return returnVal;
};

var _validate = StringFormatValidation.validate = function () {
  var rules = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var string = arguments[1];

  if (typeof string === 'number') {
    // coerce to string
    string += '';
  }

  // use 'validator' as 'v'
  var _valid = true;
  if (rules.type) {
    switch (rules.type) {
      case 'date':
        _valid = validator.isDate(string);
        break;
      case 'email':
        _valid = validator.isEmail(string);
        break;
      case 'creditcard':
        _valid = validator.isCreditCard(string);
        break;
      case 'phone':
        try {
          _valid = string.match(/\d/g).join('').length === 10;
        } catch (e) {
          _valid = false;
        }
        break;
      case 'number':
        _valid = validator.isInt(string);
        break;
    }
  }

  if (!_valid) {
    return _valid;
  }

  if (rules.min || rules.max || rules.size) {
    var min = rules.min || 0;
    var max = rules.max || undefined;
    var size = rules.size || undefined;

    if (size) {
      min = max = size;
    }

    _valid = validator.isLength(string, { min: min, max: max });
  }

  return _valid;
};

var _format = StringFormatValidation.format = function (format, string, args) {
  try {
    string = string.match(/\w/g).join('');
  } catch (e) {
    string = '';
  }
  args = args || {};
  // use 'string-mask' as 'mask'
  return new Mask(format, args).apply(string);
};

/**
 * Export Our Function
 */
module.exports = StringFormatValidation;

var __validateArguments = function __validateArguments(rules, val) {
  var invokationError = null;
  var invokationMsg = 'string-format-validation :: argument error - ';

  var _rules = typeof rules === 'undefined' ? 'undefined' : _typeof(rules);
  var _val = typeof val === 'undefined' ? 'undefined' : _typeof(val);

  if (_rules !== 'object') {
    invokationError = invokationMsg + 'first argument is not an object';
  } else if (_val !== 'object' && _val !== 'string' && _val !== 'number') {
    invokationError = invokationMsg + 'second argument must be string, number or object map that matches the rules map';
  }

  return invokationError === null ? false : invokationError;
};
