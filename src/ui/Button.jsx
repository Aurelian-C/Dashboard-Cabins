import classes from './Button.module.css';

export default function Button({
  size = 'medium',
  variation = 'primary',
  type,
  children,
  onClick,
  disabled,
}) {
  let sizes;
  let variationClass;

  if (size === 'small') {
    sizes = {
      fontSize: '1.2rem',
      padding: '0.4rem 0.8rem',
      textTransform: 'uppercase',
      fontWeight: '600',
      textAlign: 'center',
    };
  }
  if (size === 'medium') {
    sizes = {
      fontSize: '1.4rem',
      padding: '1.2rem 1.6rem',
      fontWeight: '500',
    };
  }
  if (size === 'large') {
    sizes = {
      fontSize: '1.6rem',
      padding: '1.2rem 2.4rem',
      fontWeight: '500',
    };
  }

  if (variation === 'primary') {
    variationClass = classes.button__primary;
  }
  if (variation === 'secondary') {
    variationClass = classes.button__secondary;
  }
  if (variation === 'danger') {
    variationClass = classes.button__danger;
  }

  return (
    <button
      style={sizes}
      className={`${classes.button} ${variationClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
