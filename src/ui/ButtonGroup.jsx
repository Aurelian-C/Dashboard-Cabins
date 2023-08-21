import classes from './ButtonGroup.module.css';

export default function ButtonGroup({ children }) {
  return <div className={classes.container}>{children}</div>;
}
