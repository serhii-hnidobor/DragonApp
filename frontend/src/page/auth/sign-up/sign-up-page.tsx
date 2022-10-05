import { AuthSubmitButton, ErrorBox, Input, NavLink, PasswordInput } from '../../../components/common/common';
import { useAppForm } from '../../../hooks/use-app-form/use-app-form.hook';
import commonFormStyles from '../../account-verification-page/form-controls.module.scss';
import { ReactElement, useEffect } from 'react';
import { signUp } from '../../../store/auth/actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import styles from '../sign-in/style.module.scss';
import { AppRoutes } from '../../../constants/enums/app/routes/routes';
import clsx from 'clsx';
import { userSignUp } from '../../../constants/validation-schemas/validation-schemas';
import { useNavigate } from 'react-router-dom';

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, errors, handleSubmit, isValid } = useAppForm<SignUpFormValues>({
    defaultValues: { email: '', password: '', passwordConfirm: '' },
    mode: 'onChange',
    validationSchema: userSignUp,
  });

  const { error, user } = useAppSelector((state) => state.auth);

  const onSubmit = (submitValue: SignUpFormValues): void => {
    dispatch(signUp(submitValue));
  };

  useEffect(() => {
    if (user) {
      navigate(AppRoutes.ROOT);
    }
  }, [user, navigate]);

  return (
    <div className={styles['sign-in-page-container']}>
      <div className={styles['sign-in-container']}>
        <div className={styles['sign-in-container-content']}>
          <div className={styles['sign-up-header']}>
            <h1>Sign up</h1>
          </div>
          {error && <ErrorBox message={error} />}
          <form
            className={clsx(commonFormStyles['form-container'], styles['sign-in-form'])}
            onSubmit={handleSubmit(onSubmit)}
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
              label="Password"
              wrapperClassName={commonFormStyles['form-input']}
            />
            <AuthSubmitButton
              isLoading={false}
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
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
