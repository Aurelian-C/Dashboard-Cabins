import classes from './DashboardBox.module.css';

export default function DashboardBox({ children }) {
  return <div className={classes.dashboard__box}>{children}</div>;
}
