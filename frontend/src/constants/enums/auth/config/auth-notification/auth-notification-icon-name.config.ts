import { IconName } from '../../../icon/icon';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithIconName: Record<AuthNotification, IconName> = {
  [AuthNotification.SIGN_UP_SUCCESS]: IconName.BELL,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: IconName.BELL,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: IconName.BELL,
};

export { matchAuthNotificationWithIconName };
