import UserAvatar from '../features/authentication/UserAvatar';
import classes from './Header.module.css';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <header className={classes.header}>
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
