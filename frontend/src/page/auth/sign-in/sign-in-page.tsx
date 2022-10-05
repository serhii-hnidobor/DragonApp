import {
  AuthContainer,
  AuthSubmitButton,
  ErrorBox,
  Input,
  NavLink,
  PasswordInput,
} from '../../../components/common/common';
import commonFormStyles from '../../account-verification-page/form-controls.module.scss';
import { ReactElement, useEffect, useState } from 'react';
import { signIn } from '../../../store/auth/actions';
import { useAppDispatch, useAppForm, useAppSelector } from '../../../hooks/hooks';
import styles from './style.module.scss';
import { AppRoutes } from '../../../constants/enums/app/routes/routes';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { userSignIn } from '../../../constants/validation-schemas/user/user.validation-schemas';

interface SignInFromValues {
  email: string;
  password: string;
}

const SignInPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  const { control, errors, handleSubmit, isValid } = useAppForm<SignInFromValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    validationSchema: userSignIn,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // may be error from sin up it could be from previous operations (SignUp)
  const [isError, setIsError] = useState<boolean>(false);
  const { error: errorFromState } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  const handleSignInSubmit = async (formValues: SignInFromValues): Promise<void> => {
    setIsError(false);
    try {
      setIsLoading(true);
      await dispatch(signIn(formValues)).unwrap();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasUser) {
      navigate(AppRoutes.ROOT, { replace: true });
    }
  }, [hasUser, navigate, dispatch]);

  return (
    <AuthContainer pageTitle={'Sign in'}>
      {isError && errorFromState && <ErrorBox message={errorFromState} />}
      <form
        className={clsx(commonFormStyles['form-container'], styles['sign-in-form'])}
        onSubmit={handleSubmit(handleSignInSubmit)}
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
        <AuthSubmitButton
          isLoading={isLoading}
          disabled={!isValid}
          name="Submit"
          className={commonFormStyles['upper-space-regular']}
        />
      </form>
      <NavLink
        linkTitle="Don't have account?"
        prompt=""
        route={AppRoutes.SIGN_UP}
        className={commonFormStyles['upper-space-regular']}
      />
      <NavLink
        linkTitle="Don't resive verification letter"
        prompt=""
        route={AppRoutes.ACCOUNT_VERIFICATION_INIT}
        className={commonFormStyles['upper-space-regular']}
      />
    </AuthContainer>
  );
};

export { SignInPage };
