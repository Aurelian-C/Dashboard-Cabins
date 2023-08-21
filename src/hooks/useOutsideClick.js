import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, listenCapturing); // setting true will set the event listener only to capturing phase, but not to bubbling phase

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
