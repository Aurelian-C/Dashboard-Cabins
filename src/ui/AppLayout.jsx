import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import classes from './AppLayout.module.css';
// import { useEffect } from "react";

function AppLayout() {
  /*
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, []);
  */

  return (
    <div className={classes.app__layout}>
      <Header />
      <Sidebar />
      <main className={classes.app__main}>
        <div className={classes.app__container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;





