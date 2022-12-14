import React, { ReactElement, useEffect } from 'react';
import { DragonPage } from '../../page/dragon-page/dragon-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../constants/enums/app/routes/routes';
import { AccountVerificationInitPage } from '../../page/account-verification-page/account-verification-init-page';
import { AccountVerificationConfirmPage } from '../../page/account-verification-page/account-verification-confirm-page';
import { SignInPage } from '../../page/auth/sign-in/sign-in-page';
import { SignUpPage } from '../../page/auth/sign-up/sign-up-page';
import { ProtectedRoute } from '../common/protected-route/protected-route';
import { tokensStorageService } from '../../services/services';
import { useAppDispatch } from '../../hooks/hooks';
import { ReactNotifications } from 'react-notifications-component';
import { authActions } from '../../store/actions';
import { DragonListPage } from '../../page/dragon-list-page/dragon-list-page';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const hasToken = Boolean(tokensStorageService.getTokens().accessToken);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [hasToken, dispatch]);
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path={AppRoutes.ACCOUNT_VERIFICATION_CONFIRM} element={<AccountVerificationConfirmPage />} />
        <Route path={AppRoutes.ACCOUNT_VERIFICATION_INIT} element={<AccountVerificationInitPage />} />
        <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
        <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
        <Route path={AppRoutes.ROOT} element={<ProtectedRoute element={<DragonPage />} />} />
        <Route path={AppRoutes.DRAGON_LIST} element={<ProtectedRoute element={<DragonListPage />} />} />
      </Routes>
    </>
  );
}

export { App };
