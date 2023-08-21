import classes from './Box.module.css';

export default function Box({ children }) {
  return <div className={classes.box}>{children}</div>;
}
