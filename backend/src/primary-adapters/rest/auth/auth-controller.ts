import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import { CONTAINER_TYPES, UserSignUpRequestDto, UserSignUpResponseDto } from '../../../shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { AccountVerificationService } from '~/core/account-verification/application/account-verification-service';
import { DuplicationError } from '~/shared/exceptions/duplication-error';

@controller(ApiPath.AUTH)
export class AuthController extends BaseHttpController {
  private userService: UserService;
  private accountVerificationService: AccountVerificationService;

  constructor(
    @inject(CONTAINER_TYPES.UserService) userService: UserService,
    @inject(CONTAINER_TYPES.AccountVerificationService) accountVerification: AccountVerificationService,
  ) {
    super();

    this.accountVerificationService = accountVerification;
    this.userService = userService;
  }

  @httpPost(AuthApiPath.SIGN_UP)
  public async signUp(@requestBody() userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    const duplicateUser = await this.userService.getUserByEmail(userRequestDto.email);
    if (duplicateUser) {
      throw new DuplicationError();
    }
    const user = await this.userService.createUser(userRequestDto);
    await this.accountVerificationService.sendVerificationEmail(user);
    return user;
  }
}
