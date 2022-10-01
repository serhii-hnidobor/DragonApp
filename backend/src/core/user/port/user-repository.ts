import { User } from '@prisma/client';
import { UserSignUpRequestDto } from 'shared/build';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void>;
  createUser(userRequestDto: UserSignUpRequestDto): Promise<User>;
}
