const { REACT_APP_API_ORIGIN_URL, REACT_APP_SERVER_HOST } = process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  SERVER_HOST: REACT_APP_SERVER_HOST || 'localhost',
} as const;

export { ENV };
