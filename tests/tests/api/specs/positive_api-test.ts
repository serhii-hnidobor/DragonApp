import { AuthController } from '../lib/controllers/auth.controller';
import {
  checkResponseBodyMessage,
  checkResponseTime,
  checkSchema,
  checkStatusCode,
} from '../../helpers/functionsForChecking.helpers';
const schemas = require('./data/schemas_testData.json');
const chai = require('chai');
import { CONFIG } from '../../config/config';
import { Swagger } from '../lib/controllers/swagger/swagger.controller';

chai.use(require('chai-json-schema'));

const auth = new AuthController();
const swagger = new Swagger();

describe('Positive tests', () => {
  before('Sign in', async () => {
    const response = await auth.signInUser(CONFIG.USER_EMAIL, CONFIG.USER_PASSWORD);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_signIn);
    checkResponseBodyMessage(response, 'You successfully logged in!');
  });

  it('Swagger', async () => {
    const response = await swagger.swaggerReq();
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
  });
});
