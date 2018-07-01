// @flow

import { Common } from '@microbusiness/common-javascript';
import { OrderService, DepartmentCategoryService } from '@fingermenu/parse-server-common';
import { List } from 'immutable';
import { GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { convert, ZonedDateTime } from 'js-joda';
import DepartmentCategory from './DepartmentCategory';

export const getDepartmentCategoriesReport = async (
  searchArgs,
  { tagLoaderById, menuItemPriceLoaderById, choiceItemPriceLoaderById },
  sessionToken,
) => {
  let dateTimeRange;

  if (searchArgs.has('dateTimeRange')) {
    dateTimeRange = {
      from: convert(ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'from']))).toDate(),
      to: convert(ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'to']))).toDate(),
    };

    if (dateTimeRange.to < dateTimeRange.from) {
      throw new Error('dateTimeRange is invalid. \'to\' is less than \'from\'.');
    }
  }

  const criteriaToFetchOrders = Map({
    ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
    conditions: Map({
      deosNotExist_cancelledAt: true,
      restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
      greaterThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.from : undefined,
      lessThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.to : undefined,
    }),
  });
  const result = new OrderService().searchAll(criteriaToFetchOrders, sessionToken);
  let orders = List();

  try {
    result.event.subscribe(info => {
      orders = orders.push(info);
    });

    await result.promise;
  } finally {
    result.event.unsubscribeAll();
  }

  const orderMenuItemPrices = orders
    .flatMap(order => order.get('details').filter(orderMenuItemPrice => orderMenuItemPrice.get('paid')))
    .map(orderMenuItemPrice =>
      Map({
        menuItemPriceId: orderMenuItemPrice.get('menuItemPriceId'),
        choiceItemPriceIds: orderMenuItemPrice
          .get('orderChoiceItemPrices')
          .map(orderChoiceItemPrice => orderChoiceItemPrice.get('choiceItemPriceId')),
        discount: orderMenuItemPrice.getIn(['paymentGroup', 'discount']),
      }),
    );
  const menuItemPriceIds = orderMenuItemPrices.map(orderMenuItemPrice => orderMenuItemPrice.get('menuItemPriceId')).toSet();
  const choiceItemPriceIds = orderMenuItemPrices.flatMap(orderMenuItemPrice => orderMenuItemPrice.get('choiceItemPriceIds')).toSet();
  const menuItemPricesAndChoiceItemPrices = await Promise.all([
    menuItemPriceLoaderById.loadAll(menuItemPriceIds.toArray()),
    choiceItemPriceLoaderById.loadAll(choiceItemPriceIds.toArray()),
    new DepartmentCategoryService().search(Map(), sessionToken),
  ]);
  const menuItemPrices = menuItemPricesAndChoiceItemPrices[0];
  const choiceItemPrices = menuItemPricesAndChoiceItemPrices[1];
  const departmentCategories = menuItemPricesAndChoiceItemPrices[2];
  const departmentCategoryTags = await tagLoaderById.loadAll(
    departmentCategories.map(departmentCategory => departmentCategory.get('tagId')).toArray(),
  );
  const departmentCategoriesWitTagInfo = departmentCategories.map(departmentCategory =>
    departmentCategory.set('tag', departmentCategoryTags.find(tag => tag.get('id').localeCompare(departmentCategory.get('tagId')) === 0)),
  );
  const levelTwoDepartmentCategories = departmentCategoriesWitTagInfo.filter(departmentCategory => departmentCategory.getIn(['tag', 'level']) === 2);

  const orderMenuItemPricesWithPricesInfo = orderMenuItemPrices.map(orderMenuItemPrice =>
    orderMenuItemPrice.set(
      'menuItemPrice',
      menuItemPrices.find(menuItemPrice => menuItemPrice.get('id').localeCompare(orderMenuItemPrice.get('menuItemPriceId')) === 0),
    ),
  );

  const untaggedMenuItemPrices = menuItemPrices.filter(menuItemPrice =>
    Common.isNullOrUndefined(
      levelTwoDepartmentCategories.find(departmentCategory =>
        menuItemPrice.get('tagIds').find(tagId => departmentCategory.get('tagId').localeCompare(tagId) === 0),
      ),
    ),
  );
  const levelTwoDepartmentCategoriesWithMenuItemPrices = levelTwoDepartmentCategories.map(departmentCategory =>
    departmentCategory.set(
      'menuItemPrices',
      menuItemPrices.filter(menuItemPrice => menuItemPrice.get('tagIds').find(tagId => departmentCategory.get('tagId').localeCompare(tagId) === 0)),
    ),
  );

  return List();
};

const DepartmentSubCategoryReport = new GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
  },
});

export default new GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    departmentSubCategoriesReport: {
      type: new GraphQLList(new GraphQLNonNull(DepartmentSubCategoryReport)),
      resolve: _ => _.get('departmentSubCategoriesReport'),
    },
  },
});
