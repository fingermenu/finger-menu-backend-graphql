// @flow

import { LanguageService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

export const languageLoaderByKey = new Dataloader(async keys => {
  const languageService = new LanguageService();

  return Promise.all(keys.map(async key => languageService.search(Map({ conditions: Map({ key }) })).first()));
});

export const languageLoaderById = new Dataloader(async ids => {
  const languages = await new LanguageService().search(Map({ ids: List(ids) }));

  return ids.map(id => languages.find(language => language.get('id').localeCompare(id) === 0));
});
