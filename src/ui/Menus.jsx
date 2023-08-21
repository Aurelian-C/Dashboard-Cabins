import classes from './Menus.module.css';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className={classes.menu}>{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button className={classes.menu__toggle} onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useOutsideClick(close, false);

  if (openId !== id) {
    return null;
  }

  return createPortal(
    <ul
      className={classes.menu__list}
      style={{ right: position.x, top: position.y }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button className={classes['menu__button--styled']} onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
