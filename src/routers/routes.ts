interface RouteProp {
  [name: string]: {
    name: string;
    path: string;
  };
}

const ROUTES: RouteProp = {
  login: {
    name: 'Login',
    path: '/login',
  },
  register: {
    name: 'Register',
    path: '/register',
  },
  home: {
    name: 'Home',
    path: '/home',
  },
  forbidden: {
    name: 'Forbidden',
    path: '/forbidden',
  },
  
};

export default ROUTES;
