import { lazy } from 'react';
import { AppRouteProps } from 'routers/type';
import ROUTE from '../routes';

const Home = lazy(() => import('../../pages/home'));

const privateRoutes: Partial<AppRouteProps>[] = [
  {
    name: ROUTE.home.name,
    path: ROUTE.home.path,
    component: Home,
    permissionRoles: ['all'],
    breadcrumbs: [
      {
        name: ROUTE.home.name,
      },
    ],
  },
];

export default privateRoutes;
