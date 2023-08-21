import classes from './Flag.module.css';

export default function Flag({ src, alt }) {
  return <img src={src} className={classes.image} alt={alt} />;
}
