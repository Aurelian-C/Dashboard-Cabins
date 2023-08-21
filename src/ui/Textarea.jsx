import React from 'react';
import classes from './Textarea.module.css';

const Textarea = React.forwardRef((props, ref) => {
  return <textarea className={classes.textarea} {...props} ref={ref} />;
});

export default Textarea;
