import { FieldValues, Resolver } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { ValidationSchema } from 'constants/types/types';

const getFormValidationResolver = <SchemaObjectType extends FieldValues>(
  validationSchema: ValidationSchema<SchemaObjectType>,
): Resolver<SchemaObjectType> => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
