import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, request, requestBody } from 'inversify-express-utils';
import { ApiPath, AuthApiPath } from '~/shared/enums/api/api';
import { CONTAINER_TYPES, UserSignUpRequestDto, UserSignUpResponseDto } from '../../../shared/types/types';
import { UserService } from '~/core/user/application/user-service';
import { AccountVerificationService } from '~/core/account-verification/application/account-verification-service';
import { DuplicationError } from '~/shared/exceptions/duplication-error';
import {
  AccountVerificationConfirmRequestDto,
  AccountVerificationConfirmResponseDto,
  AccountVerificationInitRequestDto,
  AccountVerificationInitResponseDto,
  errorCodes,
  GetCurrentUserResponseDto,
  RefreshTokenRequestDto,
  TokenPair,
  userSignIn,
  UserSignInRequestDto,
  UserSignInResponseDto,
  userSignUp,
} from 'shared/build';
import { Unauthorized } from '~/shared/exceptions/unauthorized';
import { generateJwt } from '~/shared/helpers/encryption';
import { CONFIG } from '~/configuration/config';
import { NotFound } from '~/shared/exceptions/not-found';
import { RefreshTokenService } from '~/core/refresh-token/application/refresh-token-service';
import { trimUser } from '~/shared/helpers/user/trim-user';
import { exceptionMessages, successMessages } from '~/shared/constants/enum/messages';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { authenticationMiddleware, validationMiddleware } from '~/primary-adapters/rest/middleware';
import { ExtendedAuthenticatedRequest } from '~/shared/types/express';

@controller(ApiPath.AUTH)
export class AuthController extends BaseHttpController {
  private userService: UserService;
  private accountVerificationService: AccountVerificationService;
  private refreshTokenService: RefreshTokenService;

  constructor(
    @inject(CONTAINER_TYPES.UserService) userService: UserService,
    @inject(CONTAINER_TYPES.RefreshTokenService) refreshTokenService: RefreshTokenService,
    @inject(CONTAINER_TYPES.AccountVerificationService) accountVerification: AccountVerificationService,
  ) {
    super();

    this.accountVerificationService = accountVerification;
    this.refreshTokenService = refreshTokenService;
    this.userService = userService;
  }

  @httpPost(AuthApiPath.SIGN_UP, validationMiddleware(userSignUp))
  public async signUp(@requestBody() userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    const duplicateUser = await this.userService.getUserByEmail(userRequestDto.email);
    if (duplicateUser) {
      throw new DuplicationError();
    }
    delete userRequestDto.passwordConfirm;
    const user = await this.userService.createUser(userRequestDto);
    await this.accountVerificationService.sendVerificationEmail(user);
    return { message: successMessages.auth.SUCCESS_SIGN_UP };
  }

  @httpPost(AuthApiPath.REFRESH_TOKENS)
  public async refreshTokens(
    @requestBody() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<{ tokens: TokenPair }> {
    const tokenUser = await this.refreshTokenService.getRefreshTokenUser(refreshTokenRequestDto.refreshToken);

    if (!tokenUser) {
      throw new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN);
    }

    const newRefreshToken = await this.userService.createRefreshToken(tokenUser.id);
    const newAccessToken = await generateJwt({
      payload: trimUser(tokenUser),
      lifetime: CONFIG.ENCRYPTION.ACCESS_TOKEN_LIFETIME,
      secret: CONFIG.ENCRYPTION.ACCESS_TOKEN_SECRET,
    });
    return {
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }

  @httpPost(AuthApiPath.ACCOUNT_VERIFICATION_CONFIRM)
  public async accountVerificationConfirm(
    @requestBody() requestDto: AccountVerificationConfirmRequestDto,
  ): Promise<AccountVerificationConfirmResponseDto> {
    const tokenUser = await this.accountVerificationService.getConfirmTokenUser(requestDto.token);

    if (!tokenUser) {
      throw new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_ACCOUNT_VERIFICATION_LINK);
    }
    if (tokenUser.isActivated) {
      return {
        message: successMessages.auth.SUCCESS_ACCOUNT_ALREADY_VERIFIED,
      };
    }
    await this.userService.setIsActivated(true, tokenUser.id);
    return {
      message: successMessages.auth.SUCCESS_ACCOUNT_VERIFICATION,
    };
  }

  @httpPost(AuthApiPath.ACCOUNT_VERIFICATION_INIT)
  public async accountVerificationInit(
    @requestBody() requestDto: AccountVerificationInitRequestDto,
  ): Promise<AccountVerificationInitResponseDto> {
    const user = await this.userService.getUserByEmail(requestDto.email);
    if (!user) {
      throw new NotFound(exceptionMessages.auth.INCORRECT_EMAIL);
    }

    if (user.isActivated) {
      return {
        message: successMessages.auth.SUCCESS_ACCOUNT_VERIFICATION_INIT_ALREADY_VERIFIED,
      };
    }

    await this.accountVerificationService.sendVerificationEmail(user);

    return {
      message: successMessages.auth.SUCCESS_ACCOUNT_VERIFICATION_INIT_NEW_LETTER,
    };
  }

  @httpPost(AuthApiPath.SIGN_IN, validationMiddleware(userSignIn))
  public async signIn(@requestBody() userRequestDto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    const user = await this.userService.getUserByEmail(userRequestDto.email);
    if (!user) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS_LOGIN);
    }
    if (!user.isActivated) {
      throw new Forbidden(exceptionMessages.auth.EMAIL_NOT_VERIFIED, errorCodes.auth.signIn.UNVERIFIED);
    }
    const isSameHash = userRequestDto.password === user.password;
    if (!isSameHash) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS_LOGIN);
    }
    const accessToken = await generateJwt({
      payload: trimUser(user),
      lifetime: CONFIG.ENCRYPTION.ACCESS_TOKEN_LIFETIME,
      secret: CONFIG.ENCRYPTION.ACCESS_TOKEN_SECRET,
    });
    return {
      user: trimUser(user),
      tokens: {
        accessToken,
        refreshToken: await this.userService.createRefreshToken(user.id),
      },
      message: successMessages.auth.SUCCESS_SIGN_IN,
    };
  }

  @httpGet(AuthApiPath.USER, authenticationMiddleware)
  public async getCurrentUser(@request() req: ExtendedAuthenticatedRequest): Promise<GetCurrentUserResponseDto> {
    const user = await this.userService.getUserByEmail(req.user.email);
    if (!user) {
      throw new NotFound(exceptionMessages.auth.USER_NOT_FOUND);
    }

    return {
      user: trimUser(user),
    };
  }
}
