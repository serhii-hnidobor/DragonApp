import React, { ReactElement } from 'react';
import { DragonPage } from '../../page/dragon-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../constants/enums/app/routes/routes';
import { AccountVerificationInitPage } from '../../page/account-verification-page/account-verification-init-page';
import { AccountVerificationConfirmPage } from '../../page/account-verification-page/account-verification-confirm-page';

function App(): ReactElement {
  return (
    <Routes>
      <Route path={AppRoutes.ACCOUNT_VERIFICATION_CONFIRM} element={<AccountVerificationConfirmPage />} />
      <Route path={AppRoutes.ACCOUNT_VERIFICATION_INIT} element={<AccountVerificationInitPage />} />
      <Route path={AppRoutes.ROOT} element={<DragonPage />} />
    </Routes>
  );
}

export { App };
