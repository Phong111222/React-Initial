import { useQuery } from 'react-query';
import { USER_API } from '../constants/api';
import axios from '../config/axios';
import publicRoutes from '../routers/public';

const useProfile = () =>
  useQuery(USER_API.profile.name, () => axios.get(USER_API.profile.api), {
    enabled: publicRoutes
      .map((route) => route.path)
      .some((path) => window.location.pathname.indexOf(path as string) > -1),
    onSuccess: (data) => data,
  });

export default useProfile;
