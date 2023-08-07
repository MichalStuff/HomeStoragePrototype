import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Error = ({ children, className, timeout }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(true);
    if (timeout) {
      const timer = setTimeout(() => {
        handleClose();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {show && (
        <div
          className={twMerge(
            "bg-red-400 w-[90%] text-center text-red-950 text-lg p-2 m-2 rounded-lg max-w-[330px]",
            className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};
Error.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  timeout: PropTypes.number,
};

export default Error;
