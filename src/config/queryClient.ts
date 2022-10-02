import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (error) => error,
      retry: 0,
    },
    mutations: {
      onError: (error) => error as any,
    },
  },
});

export default queryClient;
