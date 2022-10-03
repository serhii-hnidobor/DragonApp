import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '../../../shared/types/types';
import { UserService } from '../../../core/user/application/user-service';
import { User } from '@prisma/client';
import { ApiPath } from '~/shared/enums/api/api';

@controller(ApiPath.USER)
export class UserController extends BaseHttpController {
  private userService: UserService;

  constructor(@inject(CONTAINER_TYPES.UserService) userService: UserService) {
    super();

    this.userService = userService;
  }

  @httpGet('/')
  public register(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
