import { AppRouteProps } from 'routers/type';

export const checkValidRole = (
  permissionRoles: string[] = [],
  userRoles: string[] = []
) => !!userRoles?.some((role) => permissionRoles.includes(role));

export const checkValidRoute = ({
  userInfo,
  isPrivate,
  route,
}: {
  userInfo: any;
  isPrivate: boolean;
  route: Partial<AppRouteProps>;
}) => {
  if (!isPrivate) {
    return true;
  }

  if (
    route?.permissionRoles?.includes('all') ||
    checkValidRole(route?.permissionRoles, userInfo?.roles)
  ) {
    return true;
  }

  return false;
};
