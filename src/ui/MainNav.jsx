import { NavLink } from "react-router-dom";
import classes from "./MainNav.module.css";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

function MainNav() {
  return (
    <nav className={classes.nav__links}>
      <ul>
        <li>
          <NavLink to="/dashboard" className={classes.nav__link}>
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={classes.nav__link}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className={classes.nav__link}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={classes.nav__link}>
            <HiOutlineUsers />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={classes.nav__link}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
