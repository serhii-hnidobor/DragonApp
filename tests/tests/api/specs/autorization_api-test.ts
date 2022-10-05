import { AuthController } from '../lib/controllers/auth.controller';
import {
  checkResponseBodyMessage,
  checkResponseTime,
  checkSchema,
  checkStatusCode,
} from '../../helpers/functionsForChecking.helpers';
import { CONFIG } from '../../config/config';

const auth = new AuthController();
const schemas = require('./data/schemas_testData.json');
const chai = require('chai');
chai.use(require('chai-json-schema'));

describe('Autorization tests', () => {
  let accessToken, refreshToken;

  it('Sign in', async () => {
    const response = await auth.signInUser(CONFIG.USER_EMAIL, CONFIG.USER_PASSWORD);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_signIn);
    checkResponseBodyMessage(response, 'You successfully logged in!');
    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
  });

  it('Refresh tokens', async () => {
    const response = await auth.refreshTokens(refreshToken);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_refreshToken);
    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
  });

  it('User info', async () => {
    const response = await auth.userInfo(accessToken);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_userInfo);
  });
});
