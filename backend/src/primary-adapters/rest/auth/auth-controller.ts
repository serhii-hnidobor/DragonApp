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
import { compareHash, generateJwt } from '~/shared/helpers/encryption';
import { CONFIG } from '~/configuration/config';
import { NotFound } from '~/shared/exceptions/not-found';
import { RefreshTokenService } from '~/core/refresh-token/application/refresh-token-service';
import { trimUser } from '~/shared/helpers/user/trim-user';
import { exceptionMessages, successMessages } from '~/shared/constants/enum/messages';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { authenticationMiddleware, validationMiddleware } from '~/primary-adapters/rest/middleware';
import { ExtendedAuthenticatedRequest } from '~/shared/types/express';

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authorization
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      UserBaseResponse:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *      TokenPair:
 *        type: object
 *        properties:
 *          accessToken:
 *            type: string
 *          refreshToken:
 *            type: string
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *        required:
 *          - message
 *    responses:
 *      NotFound:
 *        description: The specified resource was not found
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Error'
 *      Unauthorized:
 *        description: Unauthorized
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Error'
 */

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

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: signUpUser
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                username:
   *                  type: string
   *                password:
   *                  type: string
   *                passwordConfirm:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *        400:
   *          description: Email is already taken.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */

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

  /**
   * @swagger
   * /auth/refresh-tokens:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: refreshTokens
   *      description: Refresh user's access token
   *      requestBody:
   *        description: refresh token
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                refreshToken:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  tokens:
   *                    $ref: '#/components/schemas/TokenPair'
   *        401:
   *          description: Such user-token pair was not found or inspired
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */

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
  /**
   * @swagger
   * /auth/account-verification-confirm:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: accountVerificationConfirm
   *      description: Confirm email by providing a token from the link in a letter
   *      requestBody:
   *        description: Token sent by email previously
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                token:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *        401:
   *          description: Incorrect token.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /auth/account-verification-init:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: accountVerificationInit
   *      description: Initialize verification flow by sending email to the user
   *      requestBody:
   *        description: User email
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *      responses:
   *        200:
   *          description: Successful operation (whether already activated or letter was sent will be said in the message)
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *        404:
   *          description: Email not found.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */

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

  /**
   * @swagger
   * /auth/sign-in:
   *    post:
   *      tags:
   *      - auth
   *      security: []
   *      operationId: signInUser
   *      description: Sign in user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user:
   *                    $ref: '#/components/schemas/UserBaseResponse'
   *                  tokens:
   *                    $ref: '#/components/schemas/TokenPair'
   *                  message:
   *                    type: string
   *        400:
   *          description: Invalid request format.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        401:
   *          description: Incorrect credentials.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */

  @httpPost(AuthApiPath.SIGN_IN, validationMiddleware(userSignIn))
  public async signIn(@requestBody() userRequestDto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    const user = await this.userService.getUserByEmail(userRequestDto.email);
    if (!user) {
      throw new Unauthorized(exceptionMessages.auth.INCORRECT_CREDENTIALS_LOGIN);
    }
    if (!user.isActivated) {
      throw new Forbidden(exceptionMessages.auth.EMAIL_NOT_VERIFIED, errorCodes.auth.signIn.UNVERIFIED);
    }
    const isSameHash = await compareHash(userRequestDto.password, user.password);
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

  /**
   * @swagger
   * /auth/user:
   *    get:
   *      tags:
   *      - auth
   *      security:
   *      - bearerAuth: []
   *      operationId: getCurrentUser
   *      description: Get current user info
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user:
   *                    $ref: '#/components/schemas/UserBaseResponse'
   *                  tokens:
   *                    $ref: '#/components/schemas/TokenPair'
   *        400:
   *          description: Invalid request format.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   *        404:
   *          description: Your user account was not found.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */

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

  /**
   * @swagger
   * /auth/sign-out:
   *    post:
   *      tags:
   *      - auth
   *      security:
   *      - bearerAuth: []
   *      operationId: signOut
   *      description: SignOut the user (will delete all refresh tokens)
   *      responses:
   *        204:
   *          description: Successful operation
   *        401:
   *          description: Such user-token is incorrect or missing.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Error'
   */
  @httpPost(AuthApiPath.SIGN_OUT, authenticationMiddleware)
  public async signOut(@request() req: ExtendedAuthenticatedRequest): Promise<void> {
    const user = req.user;
    return this.refreshTokenService.removeForUser(user.id);
  }
}
