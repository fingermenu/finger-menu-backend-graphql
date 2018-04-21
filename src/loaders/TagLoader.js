// @flow

import { TagService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const tagLoaderById = new Dataloader(async ids => {
  const tags = await new TagService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => tags.find(tag => tag.get('id').localeCompare(id) === 0));
});

export default tagLoaderById;
