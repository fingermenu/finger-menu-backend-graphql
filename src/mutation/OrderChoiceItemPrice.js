// @flow

import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'OrderChoiceItemPriceInput',
  fields: {
    choiceItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
  },
});
