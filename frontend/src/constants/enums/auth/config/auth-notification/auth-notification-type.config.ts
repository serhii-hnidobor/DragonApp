import { ToastNotificationType } from 'shared/build';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithNotificationType: Record<AuthNotification, ToastNotificationType> = {
  [AuthNotification.SIGN_UP_SUCCESS]: ToastNotificationType.SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: ToastNotificationType.SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: ToastNotificationType.SUCCESS,
};

export { matchAuthNotificationWithNotificationType };
