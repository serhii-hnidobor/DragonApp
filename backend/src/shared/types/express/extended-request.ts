import express from 'express';
import { UserBaseResponseDto } from 'shared/build';

export type ExtendedRequest = express.Request & {
  user?: UserBaseResponseDto;
};

export type ExtendedAuthenticatedRequest = express.Request & {
  user: UserBaseResponseDto;
};

export type GoogleExtendedRequest = express.Request & {
  url: string;
};
