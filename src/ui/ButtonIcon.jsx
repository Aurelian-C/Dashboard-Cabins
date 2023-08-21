import classes from './ButtonIcon.module.css';

export default function ButtonIcon({ children, disabled, onClick }) {
  return (
    <button disabled={disabled} className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
}
