import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faArrowAltCircleLeft,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

const IconButton = ({ theme, className, handler }) => {
  useEffect(() => {}, []);

  const chooseTheme = (theme, className, handler) => {
    let choice = theme;
    choice = choice.toLowerCase();
    switch (choice) {
      case "check":
        return check(className, handler);
      case "cancel":
        return cancel(className, handler);
      case "back":
        return back(className, handler);
      case "add":
        return add(className, handler);
      case "remove":
        return remove(className, handler);
    }
  };

  const check = (className, handler) => {
    return (
      <button
        className={className}
        onClick={() => {
          handler(false);
        }}
      >
        <FontAwesomeIcon icon={faCircleCheck} className={className} />
      </button>
    );
  };
  const back = (className, handler) => {
    return (
      <button
        className={className}
        onClick={() => {
          handler();
        }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className={className} />
      </button>
    );
  };
  const cancel = (className, handler) => {
    return (
      <button
        className={className}
        onClick={() => {
          handler(false);
        }}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    );
  };
  const add = (className, handler) => {
    return (
      <button
        className={className}
        onClick={() => {
          handler();
        }}
      >
        <FontAwesomeIcon icon={faPlusSquare} />
      </button>
    );
  };
  const remove = (className, handler) => {
    return (
      <button
        className={className}
        onClick={() => {
          handler();
        }}
      >
        <FontAwesomeIcon icon={faMinusSquare} />
      </button>
    );
  };

  return <>{chooseTheme(theme, className, handler)}</>;
};

IconButton.propTypes = {
  theme: PropTypes.string.isRequired,
  className: PropTypes.string,
  handler: PropTypes.func,
};

export default IconButton;
