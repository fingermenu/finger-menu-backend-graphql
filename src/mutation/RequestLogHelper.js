// @flow

import { RequestLogService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';

const logUserRequest = async ({ appVersion }, requestType, { userLoaderBySessionToken, configLoader }, sessionToken) => {
  const enableLogRequest = await configLoader.load('enableLogRequest');

  if (!enableLogRequest) {
    return;
  }

  return new RequestLogService().create(
    Map({ appVersion, requestType, userId: sessionToken ? (await userLoaderBySessionToken.load(sessionToken)).id : undefined }),
    null,
    sessionToken,
  );
};

export default logUserRequest;
