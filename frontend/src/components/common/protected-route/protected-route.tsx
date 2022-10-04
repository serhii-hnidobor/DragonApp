import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';
import { AppRoutes } from 'constants/enums/enums';
import { FC } from 'react';

type Props = {
  element: JSX.Element;
};

const ProtectedRoute: FC<Props> = ({ element }) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  return hasUser ? element : <Navigate to={{ pathname: AppRoutes.SIGN_IN }} />;
};

export { ProtectedRoute };
