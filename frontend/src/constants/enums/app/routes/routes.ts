import { commonFrontendPaths } from 'shared/build/common/enums/enums';

const AppParams = {
  dragonId: 'dragonId',
} as const;

const AppRoutes = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESTORE_PASSWORD_INIT: '/restore-password',
  RESTORE_PASSWORD_CONFIRM: commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.path,
  ACCOUNT_VERIFICATION_CONFIRM: commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.path,
  ACCOUNT_VERIFICATION_INIT: '/account-verify-init',
  DRAGON_$ID: `/dragon/:${AppParams.dragonId}`,
  ANY: '*',
} as const;

type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];

export { type AppRoute, AppRoutes, AppParams };
