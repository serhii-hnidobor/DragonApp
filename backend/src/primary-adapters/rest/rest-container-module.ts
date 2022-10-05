import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { AuthController } from './auth/auth-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
});

export { restContainerModule };
