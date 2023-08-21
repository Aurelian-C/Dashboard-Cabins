import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';
import classes from './HeaderMenu.module.css';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className={classes.list}>
      <li>
        <ButtonIcon
          onClick={() => {
            navigate('/account');
          }}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}
