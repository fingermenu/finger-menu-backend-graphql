// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { RestaurantService } from '@fingermenu/parse-server-common';
import Restaurant from './Restaurant';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  Map({
    language,
    include_parentRestaurant: true,
    include_menus: true,
    ids: searchArgs.has('restaurantIds') ? searchArgs.get('restaurantIds') : undefined,
    conditions: Map({
      ownedByUserId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      status: searchArgs.has('status') ? searchArgs.get('status') : undefined,
      inheritParentRestaurantMenus: searchArgs.has('inheritParentRestaurantMenus') ? searchArgs.get('inheritParentRestaurantMenus') : undefined,
    }),
  });

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('AddressDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'address');
  }

  if (sortOption && sortOption.localeCompare('AddressAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'address');
  }

  if (sortOption && sortOption.localeCompare('StatusDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'status');
  }

  if (sortOption && sortOption.localeCompare('StatusAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'status');
  }

  if (sortOption && sortOption.localeCompare('InheritParentRestaurantMenusDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'inheritParentRestaurantMenus');
  }

  if (sortOption && sortOption.localeCompare('InheritParentRestaurantMenusAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'inheritParentRestaurantMenus');
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getRestaurantsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new RestaurantService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getRestaurantsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new RestaurantService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getRestaurants = async (searchArgs, dataLoaders, sessionToken, language) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getRestaurantsCountMatchCriteria(searchArgs, userId, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const restaurants = await getRestaurantsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);
  const indexedRestaurants = restaurants.zip(Range(skip, skip + limit));

  const edges = indexedRestaurants.map(indexedItem => ({
    node: indexedItem[0],
    cursor: indexedItem[1] + 1,
  }));

  const firstEdge = edges.first();
  const lastEdge = edges.last();

  return {
    edges: edges.toArray(),
    count,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
      endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
      hasPreviousPage,
      hasNextPage,
    },
  };
};

export default connectionDefinitions({
  name: 'RestaurantType',
  nodeType: Restaurant,
});