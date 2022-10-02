import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ROUTES from 'routers/routes';

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Layout</h1>
      <button onClick={() => navigate(ROUTES.signoutOidc.path)}>Logout</button>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
