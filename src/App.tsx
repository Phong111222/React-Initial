import './i18n';
import './assets/styles/global.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from './config/queryClient';
import AppRouter from './routers';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.REACT_APP_MODE === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <Router>
        <AppRouter />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
