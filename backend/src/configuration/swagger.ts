import { CONFIG } from './config';
import swaggerJSDoc from 'swagger-jsdoc';

function initSwagger(): object {
  const apiDocsPath =
    CONFIG.APP.NODE_ENV === 'development' ? './src/primary-adapters/**/**.ts' : './build/primary-adapters/**/**.js';

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'DragonApp',
        version: '1.0.0',
        description: 'This is api for dragon app',
      },
      servers: [{ url: `${CONFIG.APP.HOST}${CONFIG.API.PREFIX}` }],
    },
    apis: [apiDocsPath],
  };

  return swaggerJSDoc(options);
}

const swagger = initSwagger();

export { swagger };
