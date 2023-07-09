import useAppTranslation from 'hooks/useAppTranslation';
import React from 'react';

const Home = () => {
  const { getTranslation } = useAppTranslation();
  return <div>{getTranslation('home.title')}</div>;
};

export default Home;
