import classes from './Heading.module.css';

export default function Heading({ as = 'h1', children }) {
  if (as === 'h1') {
    return <h1 className={classes.class__h1}>{children}</h1>;
  }

  if (as === 'h2') {
    return <h2 className={classes.class__h2}>{children}</h2>;
  }

  if (as === 'h3') {
    return <h3 className={classes.class__h3}>{children}</h3>;
  }

  if (as === 'h4') {
    return <h4 className={classes.class__h4}>{children}</h4>;
  }

  return <h1>{children}</h1>;
}
