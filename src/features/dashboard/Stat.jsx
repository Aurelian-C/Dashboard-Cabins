import classes from './Stat.module.css';

function Stat({ icon, title, value, color }) {
  return (
    <div className={classes.stat}>
      <div
        className={classes.icon}
        style={{
          backgroundColor: `var(--color-${color}-100`,
          color: `var(--color-${color}-700`,
        }}
      >
        {icon}
      </div>
      <h5 className={classes.title}>{title}</h5>
      <p className={classes.value}>{value}</p>
    </div>
  );
}

export default Stat;
