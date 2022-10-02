import React, { FC, Suspense } from 'react';
import Layout from 'components/organisms/layout';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { checkValidRoute } from 'utils';
import useProfile from '../hooks/useProfile';
import privateRoutes from './private';
import publicRoutes from './public';
import ROUTE from './routes';
import AuthProvider from '../utils/auth-provider';
import UserInfoProvider from 'contexts/userContext';
const renderRoutes = (isPrivate = false, userInfo?: any) => {
  let routes = publicRoutes;

  if (isPrivate) {
    routes = privateRoutes;
  }

  return routes.map((route, index) => {
    const { path, component, ...rest } = route;

    const Component = component as FC<typeof rest>;

    return (
      checkValidRoute({ userInfo, isPrivate, route }) && (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<div>Loading</div>}>
              <Component {...rest} />
            </Suspense>
          }
        />
      )
    );
  });
};

const renderPrivateRoutes = (userInfo: any) => (
  <Route element={<Layout />}>{renderRoutes(true, userInfo)}</Route>
);

export const AppRouter = () => {
  const { pathname } = useLocation();

  const userInfo = useProfile();

  if (pathname === '/') {
    return <Navigate to={ROUTE.home.path} />;
  }

  return (
    <UserInfoProvider>
      <AuthProvider>
        <Routes>
          {renderRoutes(false)}
          {renderPrivateRoutes(userInfo)}
          <Route path={ROUTE.forbidden.path} element={<>Forbidden</>} />
          <Route path={'*'} element={<>NOT FOUND</>} />
        </Routes>
      </AuthProvider>
    </UserInfoProvider>
  );
};

export default AppRouter;
