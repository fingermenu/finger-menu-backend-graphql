// @flow

import Immutable from 'immutable';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import Language, { getLanguage } from './Language';
import LanguageConnection, { getLanguages } from './LanguageConnection';
import TableState, { getTableState } from './TableState';
import TableStateConnection, { getTableStates } from './TableStateConnection';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    language: {
      type: Language,
      args: {
        languageId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { languageId }) => getLanguage(languageId),
    },
    languages: {
      type: LanguageConnection.connectionType,
      args: {
        ...connectionArgs,
        languageIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        key: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { sessionToken }) => getLanguages(Immutable.fromJS(args), sessionToken),
    },
    tableState: {
      type: TableState,
      args: {
        tableStateId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { tableStateId }) => getTableState(tableStateId),
    },
    tableStates: {
      type: TableStateConnection.connectionType,
      args: {
        ...connectionArgs,
        tableStateIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        key: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { sessionToken, language }) => getTableStates(Immutable.fromJS(args), sessionToken, language),
    },
  },
  interfaces: [NodeInterface],
});
