import 'config/i18n';
import './assets/styles/global.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './routers';
import { Provider } from 'react-redux';
import store from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
};

export default App;
