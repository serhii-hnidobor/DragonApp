import { Input, AuthSubmitButton } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import formStyles from '../form-controls.module.scss';
import { FC } from 'react';

type Props = {
  onSubmit: (data: SendVerificationLinkFormValues) => void;
  isLoading: boolean;
};

export interface SendVerificationLinkFormValues {
  email: string;
}

const SendVerificationLinkForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { control, errors, handleSubmit, isValid } = useAppForm<SendVerificationLinkFormValues>({
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  return (
    <>
      <form className={formStyles['form-container']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
          inputErrorClassName={formStyles['input-error']}
          wrapperClassName={formStyles['form-input']}
          placeholder="username@gmail.com"
        />
        <AuthSubmitButton
          isLoading={isLoading}
          disabled={isLoading || !isValid}
          name="Resend"
          className={formStyles['upper-space-regular']}
        />
      </form>
    </>
  );
};

export { SendVerificationLinkForm };
