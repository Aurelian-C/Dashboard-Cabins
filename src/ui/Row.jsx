import classes from './Row.module.css';

export default function Row({ type = 'vertical', children }) {
  let rowClass;

  if (type === 'vertical') {
    rowClass = classes.row__vertical;
  }

  if (type === 'horizontal') {
    rowClass = classes.row__horizontal;
  }

  return <div className={rowClass}>{children}</div>;
}
