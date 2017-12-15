'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _RestaurantHelper = require('./RestaurantHelper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddRestaurant',
  inputFields: {
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    websiteUrl: { type: _graphql.GraphQLString },
    imageUrl: { type: _graphql.GraphQLString },
    address: { type: _graphql.GraphQLString },
    googleMapUrl: { type: _graphql.GraphQLString },
    status: { type: _graphql.GraphQLString },
    inheritParentRestaurantMenus: { type: _graphql.GraphQLBoolean }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('errorMessage');
      }
    },
    restaurant: {
      type: _type.OwnedRestaurantConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('ownedRestaurant');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args, _ref2) {
      var sessionToken = _ref2.sessionToken,
          dataLoaders = _ref2.dataLoaders;
      var restaurantId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _RestaurantHelper.addRestaurant)(args, dataLoaders, sessionToken);

            case 3:
              restaurantId = _context.sent;
              _context.t0 = _immutable.Map;
              _context.next = 7;
              return (0, _type.getOwnedRestaurants)((0, _immutable.Map)({ ownedRestaurantIds: _immutable.List.of(restaurantId) }), dataLoaders, sessionToken);

            case 7:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                ownedRestaurant: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 12:
              _context.prev = 12;
              _context.t3 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t3 instanceof Error ? _context.t3.message : _context.t3 }));

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 12]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});