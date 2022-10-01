import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '../../../shared/types/types';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getAll(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }

  getById(id: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        id,
      },
    });
  }

  createUser(userRequestDto: UserSignUpRequestDto): Promise<User> {
    return this.prismaClient.user.create({
      data: userRequestDto,
    });
  }
}
