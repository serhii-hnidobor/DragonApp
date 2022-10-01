import { AuthContainer } from '../../components/common/common';
import { Button, createToastNotification, NavLink } from 'components/common/common';
import { useEffect, useState, FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonFrontendPaths } from 'shared/build/common/enums/enums';
import {
  SendVerificationLinkForm,
  SendVerificationLinkFormValues,
} from './send-verification-link-form/send-verification-link-form';
import authSumbitBtnStyles from '../../components/common/auth-submit-btn/styles.module.scss';
import styles from './styles.module.scss';
import { AppRoutes } from 'constants/enums/enums';
import clsx from 'clsx';
import { authApi } from 'services/services';
import { ErrorBox } from 'components/common/errors/errors';
import { allAuthNotifications, AuthNotification } from '../../constants/enums/enums';
import formStyles from './form-controls.module.scss';

const AccountVerificationConfirmPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [showResendForm, setShowResendForm] = useState(false);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const token = queryParams.get(commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.queryParamNames.token);

  useEffect(() => {
    if (!token) {
      setError('The token in your link has expired or is incorrect. Please, get a new link using the button below');
      return;
    }
    const { cancelRequest, response: responsePromise } = authApi.confirmAccountVerification({
      token: decodeURIComponent(token),
    });
    const confirm = async (): Promise<void> => {
      try {
        setError(false);
        setIsLoading(true);
        // remember that token in url is encoded to base64url
        const response = await responsePromise;
        navigate(AppRoutes.SIGN_IN, { replace: true });
        createToastNotification({
          ...allAuthNotifications[AuthNotification.ACCOUNT_VERIFICATION_SUCCESS],
          message: response.message,
        });
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unknown error occurred. Refresh the page, or get a new verification link',
        );
      } finally {
        setIsLoading(false);
      }
    };
    confirm();
    return () => cancelRequest();
  }, [token, navigate]);

  const handleVerificationFormSubmit = async (data: SendVerificationLinkFormValues): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      const response = await authApi.sendAccountVerificationLetter({ email: data.email });
      navigate(AppRoutes.SIGN_IN, { replace: true });
      createToastNotification({
        ...allAuthNotifications[AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT],
        message: response.message,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred. Try again, please');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer pageTitle="Account Verification">
      {error && <ErrorBox message={error} />}
      {showResendForm ? (
        <SendVerificationLinkForm onSubmit={handleVerificationFormSubmit} isLoading={isLoading} />
      ) : (
        <Button
          content="Resend verification link?"
          className={clsx(
            authSumbitBtnStyles['auth-submit-btn'],
            styles['resend-prompt-btn'],
            formStyles['upper-space-regular'],
          )}
          onClick={(): void => {
            setShowResendForm(true);
          }}
          disabled={isLoading}
        />
      )}
      <NavLink
        linkTitle="Back to Sign In"
        prompt=""
        route={AppRoutes.SIGN_IN}
        className={formStyles['upper-space-regular']}
      />
    </AuthContainer>
  );
};

export { AccountVerificationConfirmPage };
