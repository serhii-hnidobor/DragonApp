import { User } from '@prisma/client';
import { UserSignUpRequestDto } from 'shared/build';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  createUser(userRequestDto: UserSignUpRequestDto): Promise<User>;
}
