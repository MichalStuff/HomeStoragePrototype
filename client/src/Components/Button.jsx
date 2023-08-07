import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Button = ({ children, theme = "primary", classname, handler }) => {
  const chooseTheme = (children, theme, className, handler) => {
    let choice = theme;
    if (choice) {
      choice = choice.toLowerCase();
    }
    switch (choice) {
      case "primary":
        return primary(children, className, handler);
      case "add":
        return add(children, className, handler);
      case "secondary":
        return secondary(children, className, handler);
      default:
        return primary(children, className, handler);
    }
  };

  const primary = (children, className, handler) => {
    return (
      <button
        className={twMerge(
          "text-blue-700 text-lg font-bold w-[90%] p-2 m-2 bg-slate-50 rounded-lg max-w-[330px]",
          className
        )}
        onClick={() => {
          if (handler !== undefined) handler();
        }}
      >
        {children}
      </button>
    );
  };

  const secondary = (children, className, handler) => {
    return (
      <button
        className={twMerge(
          "text-slate-50 text-lg font-bold w-[90%]  m-2 bg-blue-700 border-2 rounded-lg max-w-[330px]",
          className
        )}
        onClick={() => {
          if (handler !== undefined) handler();
        }}
      >
        {children}
      </button>
    );
  };

  const add = (children, className, handler) => {
    return (
      <button
        className={twMerge(
          "text-white text-lg font-bold w-[90%] p-2 m-2 bg-green-500 rounded-lg max-w-[330px]",
          className
        )}
        onClick={() => {
          if (handler !== undefined) handler();
        }}
      >
        {children}
      </button>
    );
  };

  return <>{chooseTheme(children, theme, classname, handler)}</>;
};
Button.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
  classname: PropTypes.string,
  handler: PropTypes.func,
};

export default Button;
