// @flow

import { GraphQLBoolean, GraphQLFloat, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'OrderChoiceItemPriceInput',
  fields: {
    id: { type: GraphQLID },
    choiceItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    paid: { type: GraphQLBoolean },
    discount: { type: GraphQLFloat },
  },
});
