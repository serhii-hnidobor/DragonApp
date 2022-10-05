import { ApiRequest } from '../request';
import { CONFIG } from '../../../config/config';

const baseUrl: string = CONFIG.BASE_URL;

export class AuthController {
  async signInUser(emailVal: string, passwordVal: string) {
    return await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url('auth/sign-in')
      .body({
        email: emailVal,
        password: passwordVal,
      })
      .send();
  }

  async refreshTokens(refreshTokenVal: string) {
    return await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url('auth/refresh-tokens')
      .body({
        refreshToken: refreshTokenVal,
      })
      .send();
  }

  async signOut(accessToken: string) {
    return await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url('auth/sign-out')
      .bearerToken(accessToken)
      .send();
  }

  async accountVerificationConfirm(tokenVal: string) {
    return await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url('auth/account-verification-confirm')
      .body({
        token: tokenVal,
      })
      .send();
  }

  async accountVerificationInit(emailVal: string) {
    return await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('POST')
      .url('auth/account-verification-init')
      .body({
        email: emailVal,
      })
      .send();
  }

  async userInfo(accessToken: string) {
    return await new ApiRequest().prefixUrl(baseUrl).method('GET').url('auth/user').bearerToken(accessToken).send();
  }
}
