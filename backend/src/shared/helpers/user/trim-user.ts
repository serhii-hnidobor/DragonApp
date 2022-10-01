import { User } from '@prisma/client';
import { UserBaseResponseDto } from 'shared/build';

export const trimUser = (user: User): UserBaseResponseDto => {
  return {
    email: user.email,
    id: user.id,
  };
};
