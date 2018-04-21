'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserFeedbacks = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _jsJoda = require('js-joda');

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _UserFeedback = require('./UserFeedback');

var _UserFeedback2 = _interopRequireDefault(_UserFeedback);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, ownedByUserId) {
  var dateRange = void 0;

  if (searchArgs.has('dateRange')) {
    dateRange = {
      from: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'from']))).toDate(),
      to: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'to']))).toDate()
    };

    if (dateRange.to < dateRange.from) {
      throw new Error('dateRange is invalid. \'to\' is less than \'from\'.');
    }
  }

  return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
    ids: searchArgs.has('userFeedbackIds') ? searchArgs.get('userFeedbackIds') : undefined,
    conditions: (0, _immutable.Map)({
      contains_others: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('others')),
      greaterThanOrEqualTo_submittedAt: dateRange ? dateRange.from : undefined,
      lessThanOrEqualTo_submittedAt: dateRange ? dateRange.to : undefined,
      ownedByUserId: ownedByUserId
    })
  }));
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('PlacedAtDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'submittedAt');
  }

  if (sortOption && sortOption.localeCompare('PlacedAtAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'submittedAt');
  }

  if (sortOption && sortOption.localeCompare('OthersDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'others');
  }

  if (sortOption && sortOption.localeCompare('OthersAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'others');
  }

  return criteria.set('PlacedAtDescending', 'submittedAt');
};

var getUserFeedbacksCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, ownedByUserId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.UserFeedbackService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getUserFeedbacksCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getUserFeedbacksMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, ownedByUserId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.UserFeedbackService().search(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')).merge((0, _immutable.Map)({ limit: limit, skip: skip })), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getUserFeedbacksMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserFeedbacks = exports.getUserFeedbacks = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, _ref4, sessionToken) {
    var userLoaderBySessionToken = _ref4.userLoaderBySessionToken;

    var userId, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, results;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.next = 5;
            return getUserFeedbacksCountMatchCriteria(searchArgs, userId, sessionToken);

          case 5:
            count = _context3.sent;

            if (!(count === 0)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt('return', _Common2.default.getEmptyResult());

          case 8:
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 11;
            return getUserFeedbacksMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

          case 11:
            results = _context3.sent;
            return _context3.abrupt('return', _Common2.default.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getUserFeedbacks(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'UserFeedbackType',
  nodeType: _UserFeedback2.default
});