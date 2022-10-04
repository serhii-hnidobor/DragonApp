import React, { ReactElement } from 'react';
import { DragonPage } from '../../page/dragon-page/dragon-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../constants/enums/app/routes/routes';
import { AccountVerificationInitPage } from '../../page/account-verification-page/account-verification-init-page';
import { AccountVerificationConfirmPage } from '../../page/account-verification-page/account-verification-confirm-page';
import { SignInPage } from '../../page/auth/sign-in/sign-in-page';
import { SignUpPage } from '../../page/auth/sign-up/sign-up-page';

function App(): ReactElement {
  return (
    <Routes>
      <Route path={AppRoutes.ACCOUNT_VERIFICATION_CONFIRM} element={<AccountVerificationConfirmPage />} />
      <Route path={AppRoutes.ACCOUNT_VERIFICATION_INIT} element={<AccountVerificationInitPage />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
      <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
      <Route path={AppRoutes.ROOT} element={<DragonPage />} />
    </Routes>
  );
}

export { App };
