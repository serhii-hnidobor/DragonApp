import { ApiPath, AuthApiPath, ContentType, HttpMethod } from 'constants/enums/enums';
import {
  AccountVerificationConfirmRequestDto,
  AccountVerificationConfirmResponseDto,
  AccountVerificationInitRequestDto,
  AccountVerificationInitResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  GetCurrentUserResponseDto,
  CancellableRequest,
} from 'constants/types/types';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public refreshTokens(payload: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.REFRESH_TOKENS}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public signOut(): Promise<void> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_OUT}`,
      options: {
        method: HttpMethod.POST,
      },
    });
  }

  public getCurrentUser(): Promise<GetCurrentUserResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.USER}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public confirmAccountVerification(
    payload: AccountVerificationConfirmRequestDto,
  ): CancellableRequest<AccountVerificationConfirmResponseDto> {
    const controller = new AbortController();
    const signal = controller.signal;
    return {
      response: this.#http.load<AccountVerificationConfirmResponseDto>({
        url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.ACCOUNT_VERIFICATION_CONFIRM}`,
        options: {
          method: HttpMethod.POST,
          payload: JSON.stringify(payload),
        },
        preInterceptors: [],
        postInterceptors: [],
        abortSignal: signal,
      }),
      cancelRequest: () => controller.abort(),
    };
  }

  public sendAccountVerificationLetter(
    payload: AccountVerificationInitRequestDto,
  ): Promise<AccountVerificationInitResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.ACCOUNT_VERIFICATION_INIT}`,
      options: {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }
}

export { AuthApi };
