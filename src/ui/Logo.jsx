import { useDarkMode } from '../context/DarkModeContext';
import classes from './Logo.module.css';

function Logo() {
  const { isDarkMode } = useDarkMode();

  const imgSrc = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

  return (
    <div className={classes.container}>
      <img src={`${imgSrc}`} alt="Logo" className={classes.image} />
    </div>
  );
}

export default Logo;
