import classes from './Form.module.css';

export default function Form({ type, children, onSubmit }) {
  let modalClass = type === 'modal' ? classes.modal : classes.no__modal;

  return (
    <form className={`${classes.form} ${modalClass}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
