import Uploader from '../data/Uploader';
import Logo from './Logo';
import MainNav from './MainNav';
import classes from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <Logo />
      <MainNav />
      <Uploader />
    </aside>
  );
}

export default Sidebar;
