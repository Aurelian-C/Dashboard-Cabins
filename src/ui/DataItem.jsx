import classes from './DataItem.module.css';

function DataItem({ icon, label, children }) {
  return (
    <div className={classes.container}>
      <span className={classes.label}>
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
