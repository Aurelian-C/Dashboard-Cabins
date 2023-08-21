import classes from './Tag.module.css';

function Tag({ children, type }) {
  return (
    <span
      className={classes.tag}
      style={{
        color: `var(--color-${type}-700)`,
        backgroundColor: `var(--color-${type}-100)`,
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
