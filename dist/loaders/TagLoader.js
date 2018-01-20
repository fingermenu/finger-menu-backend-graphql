'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonHash = require('json-hash');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _parseServerCommon = require('@fingermenu/parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tagLoaderById = new _dataloader2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(keys) {
    var tagService;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tagService = new _parseServerCommon.TagService();
            return _context2.abrupt('return', Promise.all(keys.map(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt('return', tagService.read(key.id, null, key.sessionToken));

                      case 1:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }())));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), { cacheKeyFn: _jsonHash.digest });

exports.default = tagLoaderById;