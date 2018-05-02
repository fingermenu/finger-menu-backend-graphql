'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'PackageBundle',
  fields: {
    url: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('url');
      }
    },
    checksum: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('checksum');
      }
    }
  }
});