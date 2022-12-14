import * as Joi from 'joi';
import { UserSignUpRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';
import { passwordCreationSchema } from '../password-creation/password-creation';

const userSignUp = Joi.object<UserSignUpRequestDto, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_WRONG_LENGTH,
      'string.pattern.invert.base': UserValidationMessage.EMAIL_WRONG_REGEX,
    }),
  password: passwordCreationSchema,
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': UserValidationMessage.PASSWORDS_NOT_MATCH,
    'any.required': UserValidationMessage.PASSWORD_CONFIRM_REQUIRE,
  }),
});

export { userSignUp };
