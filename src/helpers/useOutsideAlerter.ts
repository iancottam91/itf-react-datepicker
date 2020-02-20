import { useEffect } from "react";

export const useOutsideAlerter = ({
  ref,
  condition,
  callback,
  includeEscKey
}: {
  ref: any;
  condition?: any;
  callback?: Function;
  includeEscKey?: Boolean;
}) => {
  function handleClickOutside(event: Event) {
    if (ref.current && !ref.current.contains(event.target) && condition) {
      if (callback) callback(!condition);
    }
  }

  // add esc key handle
  function handleEscKeyPress(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      if (ref.current && ref.current.contains(e.target) && condition) {
        if (callback) callback(!condition);
      }
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    includeEscKey
      ? document.addEventListener("keyup", handleEscKeyPress)
      : null;
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      includeEscKey
        ? document.removeEventListener("keyup", handleEscKeyPress)
        : null;
    };
  });
};
