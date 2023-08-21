import classes from './FormRow.module.css';

export default function FormRow({ label, error, children, orientation }) {
  const containerExtraClasses =
    orientation === 'vertical'
      ? classes['container--vertical']
      : classes['container--horizontal'];

  return (
    <div className={`${classes.container} ${containerExtraClasses}`}>
      {label && (
        <label className={classes.label} htmlFor={children[0]?.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={classes.span}>{error}</span>}
    </div>
  );
}
