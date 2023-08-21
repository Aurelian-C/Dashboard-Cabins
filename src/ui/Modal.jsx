import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import classes from './Modal.module.css';
import { HiXMark } from 'react-icons/hi2';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  console.log(openName);

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // Close modal if user click outside of it
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className={classes.overlay}>
      <div className={classes.modal} ref={ref}>
        <button onClick={close} className={classes.button__modal}>
          <HiXMark />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}

function Toggle() {}

Modal.Open = Open;
Modal.Window = Window;
Modal.Toggle = Toggle;

export default Modal;
