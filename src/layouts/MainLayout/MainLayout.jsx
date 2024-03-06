import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;
