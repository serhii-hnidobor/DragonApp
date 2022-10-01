import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '../../../shared/types/types';
import { UserRepository } from '../port/user-repository';

@injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor(@inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  getById(id: string): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  createUser(userRequestDto: UserSignUpRequestDto): Promise<User> {
    return this.userRepository.createUser(userRequestDto);
  }
}
