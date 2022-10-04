import { SerializedError } from '@reduxjs/toolkit';
import { SerializedHttpError } from 'helpers/http/http';

type RejectedErrorData = {
  message?: string;
  errorCode?: string;
};

export const getRejectedErrorData = (
  error: SerializedError,
  rejectedPayload: SerializedHttpError | undefined,
): RejectedErrorData => {
  return {
    errorCode: rejectedPayload?.errorCode,
    message: rejectedPayload?.message || error.message,
  };
};
