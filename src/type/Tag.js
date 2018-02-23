// @flow

import { TagService } from '@fingermenu/parse-server-common';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import Common from './Common';

export const getTag = async (tagId, sessionToken) => new TagService().read(tagId, null, sessionToken);

const ParentTag = new GraphQLObjectType({
  name: 'ParentTag',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'name', language, configLoader),
    },
    nameToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'name', configLoader),
    },
    description: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'description', language, configLoader),
    },
    descriptionToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'description', configLoader),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: async _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: async _ => _.get('forDisplay'),
    },
  },
  interfaces: [NodeInterface],
});

export default new GraphQLObjectType({
  name: 'Tag',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'name', language, configLoader),
    },
    nameToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'name', configLoader),
    },
    description: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'description', language, configLoader),
    },
    descriptionToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'description', configLoader),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: async _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: async _ => _.get('forDisplay'),
    },
    parentTag: {
      type: ParentTag,
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) => (_.get('parentTagId') ? tagLoaderById.load(_.get('parentTagId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
