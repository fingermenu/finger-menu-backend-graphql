'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tableLoaderById = new _dataloader2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ids) {
    var tables;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _parseServerCommon.TableService().search((0, _immutable.Map)({ ids: ids }));

          case 2:
            tables = _context.sent;
            return _context.abrupt('return', ids.map(function (id) {
              return tables.find(function (table) {
                return table.get('id').localeCompare(id) === 0;
              });
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = tableLoaderById;