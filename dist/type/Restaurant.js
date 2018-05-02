'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRestaurant = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphql = require('graphql');

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _RestaurantConfigurations = require('./RestaurantConfigurations');

var _RestaurantConfigurations2 = _interopRequireDefault(_RestaurantConfigurations);

var _PackageBundle = require('./PackageBundle');

var _PackageBundle2 = _interopRequireDefault(_PackageBundle);

var _interface = require('../interface');

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getTableCriteria = function getTableCriteria(restaurantId) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      restaurantId: restaurantId
    })
  });
};

var getTablesMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(restaurantId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.TableService().search(getTableCriteria(restaurantId).set('limit', 1000), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTablesMatchCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getRestaurant = exports.getRestaurant = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(restaurantId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.RestaurantService().read(restaurantId, null, sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRestaurant(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var ParentRestaurant = new _graphql.GraphQLObjectType({
  name: 'ParentRestaurant',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref4) {
          var language = _ref4.language,
              configLoader = _ref4.dataLoaders.configLoader;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _Common2.default.getTranslation(_, 'name', language, configLoader));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x5, _x6, _x7) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    nameToPrint: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref6) {
          var configLoader = _ref6.dataLoaders.configLoader;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _Common2.default.getTranslationToPrint(_, 'name', configLoader));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x8, _x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', _.get('websiteUrl'));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x11) {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    geoLocation: {
      type: _GeoLocation2.default,
      resolve: function resolve(_) {
        var geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return (0, _immutable.Map)({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      }
    },
    phones: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Phone2.default)),
      resolve: function resolve(_) {
        var phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      }
    },
    status: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('status');
      }
    },
    googleMapUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('googleMapUrl');
      }
    },
    inheritParentRestaurantMenus: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('inheritParentRestaurantMenus');
      }
    },
    pin: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', _.get('pin'));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x12) {
          return _ref8.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Menu2.default)),
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref10) {
          var _ref10$dataLoaders = _ref10.dataLoaders,
              menuLoaderById = _ref10$dataLoaders.menuLoaderById,
              restaurantLoaderById = _ref10$dataLoaders.restaurantLoaderById;
          var menuIds, menus, menuSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  menuIds = _.get('menuIds');

                  if (!(!menuIds || menuIds.isEmpty())) {
                    _context7.next = 3;
                    break;
                  }

                  return _context7.abrupt('return', []);

                case 3:
                  _context7.next = 5;
                  return menuLoaderById.loadMany(menuIds.toArray());

                case 5:
                  menus = _context7.sent;
                  _context7.next = 8;
                  return restaurantLoaderById.load(_.get('id'));

                case 8:
                  menuSortOrderIndices = _context7.sent.get('menuSortOrderIndices');
                  return _context7.abrupt('return', menus.map(function (_) {
                    return _.set('sortOrderIndex', menuSortOrderIndices.get(_.get('id')));
                  }));

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref9.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Table2.default)),
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref12) {
          var sessionToken = _ref12.sessionToken;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return getTablesMatchCriteria(_.get('id'), sessionToken);

                case 2:
                  return _context8.abrupt('return', _context8.sent.toArray());

                case 3:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x16, _x17, _x18) {
          return _ref11.apply(this, arguments);
        };
      }()
    },
    configurations: {
      type: new _graphql.GraphQLNonNull(_RestaurantConfigurations2.default),
      resolve: function resolve(_) {
        return _.get('configurations') ? _.get('configurations') : (0, _immutable.Map)();
      }
    },
    packageBundle: {
      type: _PackageBundle2.default,
      resolve: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, args, _ref14) {
          var packageBundleLoaderByRestaurantId = _ref14.dataLoaders.packageBundleLoaderByRestaurantId;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', packageBundleLoaderByRestaurantId.load(_.get('id')));

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function resolve(_x19, _x20, _x21) {
          return _ref13.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'Restaurant',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, args, _ref16) {
          var language = _ref16.language,
              configLoader = _ref16.dataLoaders.configLoader;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', _Common2.default.getTranslation(_, 'name', language, configLoader));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x22, _x23, _x24) {
          return _ref15.apply(this, arguments);
        };
      }()
    },
    nameToPrint: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, args, _ref18) {
          var configLoader = _ref18.dataLoaders.configLoader;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', _Common2.default.getTranslationToPrint(_, 'name', configLoader));

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x25, _x26, _x27) {
          return _ref17.apply(this, arguments);
        };
      }()
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_) {
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt('return', _.get('websiteUrl'));

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, undefined);
        }));

        return function resolve(_x28) {
          return _ref19.apply(this, arguments);
        };
      }()
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    geoLocation: {
      type: _GeoLocation2.default,
      resolve: function resolve(_) {
        var geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return (0, _immutable.Map)({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      }
    },
    phones: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Phone2.default)),
      resolve: function resolve(_) {
        var phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      }
    },
    status: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('status');
      }
    },
    googleMapUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('googleMapUrl');
      }
    },
    inheritParentRestaurantMenus: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('inheritParentRestaurantMenus');
      }
    },
    pin: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_) {
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt('return', _.get('pin'));

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        }));

        return function resolve(_x29) {
          return _ref20.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Menu2.default)),
      resolve: function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, args, _ref22) {
          var _ref22$dataLoaders = _ref22.dataLoaders,
              menuLoaderById = _ref22$dataLoaders.menuLoaderById,
              restaurantLoaderById = _ref22$dataLoaders.restaurantLoaderById;
          var menuIds, menus, menuSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  menuIds = _.get('menuIds');

                  if (!(!menuIds || menuIds.isEmpty())) {
                    _context14.next = 3;
                    break;
                  }

                  return _context14.abrupt('return', []);

                case 3:
                  _context14.next = 5;
                  return menuLoaderById.loadMany(menuIds.toArray());

                case 5:
                  menus = _context14.sent;
                  _context14.next = 8;
                  return restaurantLoaderById.load(_.get('id'));

                case 8:
                  menuSortOrderIndices = _context14.sent.get('menuSortOrderIndices');
                  return _context14.abrupt('return', menus.map(function (_) {
                    return _.set('sortOrderIndex', menuSortOrderIndices.get(_.get('id')));
                  }));

                case 10:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        }));

        return function resolve(_x30, _x31, _x32) {
          return _ref21.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Table2.default)),
      resolve: function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, args, _ref24) {
          var sessionToken = _ref24.sessionToken;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return getTablesMatchCriteria(_.get('id'), sessionToken);

                case 2:
                  return _context15.abrupt('return', _context15.sent.toArray());

                case 3:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        }));

        return function resolve(_x33, _x34, _x35) {
          return _ref23.apply(this, arguments);
        };
      }()
    },
    configurations: {
      type: new _graphql.GraphQLNonNull(_RestaurantConfigurations2.default),
      resolve: function resolve(_) {
        return _.get('configurations') ? _.get('configurations') : (0, _immutable.Map)();
      }
    },
    packageBundle: {
      type: _PackageBundle2.default,
      resolve: function () {
        var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args, _ref26) {
          var packageBundleLoaderByRestaurantId = _ref26.dataLoaders.packageBundleLoaderByRestaurantId;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  return _context16.abrupt('return', packageBundleLoaderByRestaurantId.load(_.get('id')));

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        }));

        return function resolve(_x36, _x37, _x38) {
          return _ref25.apply(this, arguments);
        };
      }()
    },
    parentRestaurant: {
      type: ParentRestaurant,
      resolve: function () {
        var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, args, _ref28) {
          var restaurantLoaderById = _ref28.dataLoaders.restaurantLoaderById;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.abrupt('return', _.get('parentRestaurantId') ? restaurantLoaderById.load(_.get('parentRestaurantId')) : null);

                case 1:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        }));

        return function resolve(_x39, _x40, _x41) {
          return _ref27.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});