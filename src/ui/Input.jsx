import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return <input {...props} ref={ref} className={classes.input} />;
});

export default Input;
