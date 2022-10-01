import { encryption } from '~/shared/constants/constants';
import bcrypt from 'bcrypt';

export const hashValue = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(encryption.SALT_ROUNDS);
  return await bcrypt.hash(value, salt);
};
