import { config } from 'dotenv';
import { Level } from 'pino';
import { AppEnvironment, LogLevel } from '../shared/enums/enums';

interface AppConfig {
  PORT: number;
  HOST: string;
  NODE_ENV: AppEnvironment;
  LOGGER: {
    level: Level;
  };
  DI_CONTAINER_MODULES_PATHS: string[];
}

interface EncryptionConfig {
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_LIFETIME: string;
  REFRESH_SECRET: string;
  REFRESH_LIFETIME: string;
  VERIFICATION_TOKEN_SECRET: string;
  VERIFICATION_TOKEN_LIFETIME: string;
}

interface DatabaseConfig {
  DATABASE_URL: string;
}

interface ClientInfo {
  URL: string;
}

interface ApiConfig {
  PREFIX: string;
}

interface MailService {
  LOGIN: string;
  PASSWORD: string;
}

export interface ConfigInterface {
  APP: AppConfig;
  DATABASE: DatabaseConfig;
  API: ApiConfig;
  MAIL_SERVICE: MailService;
  ENCRYPTION: EncryptionConfig;
  CLIENT_INFO: ClientInfo;
}

const isDevEnvironment = (nodeEnv = ''): boolean => nodeEnv === AppEnvironment.DEVELOPMENT;

const getEncryptionConfig = (): EncryptionConfig => {
  const {
    ACCESS_TOKEN_SECRET,
    REFRESH_SECRET,
    VERIFICATION_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_LIFETIME,
    VERIFICATION_TOKEN_LIFETIME,
  } = process.env;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_SECRET || !VERIFICATION_TOKEN_SECRET) {
    throw new Error('Missing jwt secrets in env');
  }
  return {
    ACCESS_TOKEN_SECRET,
    REFRESH_SECRET,
    VERIFICATION_TOKEN_SECRET,
    REFRESH_LIFETIME: REFRESH_LIFETIME || encryptionConfigDefault.REFRESH_LIFETIME,
    ACCESS_TOKEN_LIFETIME: ACCESS_TOKEN_LIFETIME || encryptionConfigDefault.ACCESS_TOKEN_LIFETIME,
    VERIFICATION_TOKEN_LIFETIME: VERIFICATION_TOKEN_LIFETIME || encryptionConfigDefault.VERIFICATION_TOKEN_LIFETIME,
  };
};

const encryptionConfigDefault = {
  ACCESS_TOKEN_LIFETIME: '1d',
  REFRESH_LIFETIME: '30d',
  RESET_PASSWORD_TOKEN_LIFETIME: '30m',
  VERIFICATION_TOKEN_LIFETIME: '30m',
};

const configuration = (): ConfigInterface => {
  config();

  const { NODE_ENV, HOST, PORT, DATABASE_URL, API_BASE_PREFIX, MAIL_LOGIN, MAIL_PASSWORD, CLIENT_URL } = process.env;

  const host = HOST || 'localhost';
  const port = Number(PORT) || 5000;
  const extension = isDevEnvironment(NODE_ENV) ? '.ts' : '.js';

  return {
    APP: {
      PORT: port,
      HOST: `http://${host}:${port}`,
      NODE_ENV: <AppEnvironment>NODE_ENV || AppEnvironment.DEVELOPMENT,
      LOGGER: {
        level: isDevEnvironment(NODE_ENV) ? LogLevel.DEBUG : LogLevel.INFO,
      },
      DI_CONTAINER_MODULES_PATHS: [
        __dirname + '/../core/**/*-container-module' + extension,
        __dirname + '/../primary-adapters/**/*-container-module' + extension,
        __dirname + '/../secondary-adapters/**/*-container-module' + extension,
      ],
    },
    CLIENT_INFO: {
      URL: CLIENT_URL || 'http://localhost:3000',
    },
    ENCRYPTION: getEncryptionConfig(),
    DATABASE: {
      DATABASE_URL: DATABASE_URL || '',
    },
    MAIL_SERVICE: {
      LOGIN: MAIL_LOGIN || '',
      PASSWORD: MAIL_PASSWORD || '',
    },
    API: {
      PREFIX: API_BASE_PREFIX || '',
    },
  };
};

const CONFIG = configuration();

export { CONFIG };
