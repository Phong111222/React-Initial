import { LazyExoticComponent, ReactNode } from 'react';

export interface Breadcrumb {
  name: string;
}
export interface AppRouteProps {
  name: string;
  path: string;
  component: ReactNode | JSX.Element | LazyExoticComponent<any>;
  permissionRoles: string[];
  breadcrumbs: Breadcrumb[];
}
