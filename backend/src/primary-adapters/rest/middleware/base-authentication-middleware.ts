import { ExtendedRequest } from '~/shared/types/express';
import express from 'express';
import { Unauthorized } from '~/shared/exceptions/unauthorized';

import { UserBaseResponseDto } from 'shared/build';
import { CONFIG } from '~/configuration/config';
import { verifyJwt } from '~/shared/helpers/encryption';
import { exceptionMessages } from '~/shared/constants/enum/messages';

export const baseAthenticationMiddleware = async (
  req: ExtendedRequest,
  _res: express.Response,
  next: express.NextFunction,
  isOptional: boolean,
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    if (!isOptional) {
      return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
    }
    return next();
  }
  const token = getBearerTokenFromAuthHeader(authHeader);
  if (!token) {
    if (!isOptional) {
      return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
    }
    return next();
  }
  try {
    const payload = await verifyJwt<UserBaseResponseDto>({ jwt: token, secret: CONFIG.ENCRYPTION.ACCESS_TOKEN_SECRET });
    req.user = payload;
  } catch {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN));
  }
  next();
};

const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(' ')[1];
  return bearerToken || '';
};
