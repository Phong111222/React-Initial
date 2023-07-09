/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_MODE: 'local' | 'development' | 'staging' | 'production';
    REACT_APP_FRONTEND_URL: string;
    REACT_APP_SSL: string;
    REACT_APP_BACKEND_URL: string;
  }
}
