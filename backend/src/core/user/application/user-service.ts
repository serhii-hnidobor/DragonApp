import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '../../../shared/types/types';
import { UserRepository } from '../port/user-repository';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { hashValue } from '~/shared/helpers/encryption';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
    @inject(CONTAINER_TYPES.RefreshTokenRepository) refreshTokenRepository: RefreshTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
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

  setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void> {
    return this.userRepository.setIsActivated(shouldBeActivated, userId);
  }

  createRefreshToken(userId: string): Promise<string> {
    return this.refreshTokenRepository.createForUser(userId);
  }

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<User> {
    userRequestDto.password = await hashValue(userRequestDto.password);
    return this.userRepository.createUser(userRequestDto);
  }
}
