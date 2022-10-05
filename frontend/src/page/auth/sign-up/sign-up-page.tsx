import {
  AuthContainer,
  AuthSubmitButton,
  createToastNotification,
  ErrorBox,
  Input,
  NavLink,
  PasswordInput,
} from '../../../components/common/common';
import { useAppForm } from '../../../hooks/use-app-form/use-app-form.hook';
import commonFormStyles from '../../account-verification-page/form-controls.module.scss';
import { ReactElement, useEffect, useState } from 'react';
import { signUp } from '../../../store/auth/actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import styles from '../sign-in/style.module.scss';
import { AppRoutes } from '../../../constants/enums/app/routes/routes';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { userSignUp } from '../../../constants/validation-schemas/user/user.validation-schemas';
import { allAuthNotifications, AuthNotification } from '../../../constants/enums/auth/config/config';

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  const { control, errors, handleSubmit, isValid } = useAppForm<SignUpFormValues>({
    defaultValues: { email: '', password: '', passwordConfirm: '' },
    mode: 'onChange',
    validationSchema: userSignUp,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // may be error from sin in it could be from previous operations (SignIn)
  const [isError, setIsError] = useState<boolean>(false);
  const { error: errorFromState } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  const handleSignUpSubmit = async (formValues: SignUpFormValues): Promise<void> => {
    setIsError(false);
    try {
      setIsLoading(true);
      await dispatch(signUp(formValues)).unwrap();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      if (!isError) {
        navigate(AppRoutes.SIGN_IN);
        createToastNotification({ ...allAuthNotifications[AuthNotification.SIGN_UP_SUCCESS] });
      }
    }
  };

  useEffect(() => {
    if (hasUser) {
      navigate(AppRoutes.ROOT, { replace: true });
    }
  }, [hasUser, navigate, dispatch]);

  return (
    <AuthContainer pageTitle={'Sign up'}>
      {isError && errorFromState && <ErrorBox message={errorFromState} />}
      <form
        className={clsx(commonFormStyles['form-container'], styles['sign-in-form'])}
        onSubmit={handleSubmit(handleSignUpSubmit)}
      >
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
          inputErrorClassName={commonFormStyles['input-error']}
          wrapperClassName={commonFormStyles['form-input']}
          placeholder="username@gmail.com"
        />
        <PasswordInput
          control={control}
          errors={errors}
          name="password"
          label="Password"
          wrapperClassName={commonFormStyles['form-input']}
        />
        <PasswordInput
          control={control}
          errors={errors}
          name="passwordConfirm"
          label="Password confirm"
          wrapperClassName={commonFormStyles['form-input']}
        />
        <AuthSubmitButton
          isLoading={isLoading}
          disabled={!isValid}
          name="Submit"
          className={commonFormStyles['upper-space-regular']}
        />
      </form>
      <NavLink
        linkTitle="Already have account?"
        prompt=""
        route={AppRoutes.SIGN_IN}
        className={commonFormStyles['upper-space-regular']}
      />
    </AuthContainer>
  );
};

export { SignUpPage };
