import React from 'react';
import classes from './FileInput.module.css';

const FileInput = React.forwardRef((props, ref) => {
  return <input type="file" {...props} ref={ref} className={classes.input} />;
});

export default FileInput;
