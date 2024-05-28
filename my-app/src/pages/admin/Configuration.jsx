import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../../components/Main/main.css';
import PageTitle from '../../components/Main/PageTitle';
import ConfigOptions from '../../components/ConfigOptions/configOptions';

function Configuration() {
  const location = useLocation();
  const isExact = location.pathname === '/configuration';

  return (
    <main id='main' className='main'>
      <PageTitle page="Configuration" />
      {isExact && <ConfigOptions />}
      <Outlet />
    </main>
  );
}

export default Configuration;
