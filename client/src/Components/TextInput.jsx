import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const TextInput = ({ className, placeholder, change, value, type }) => {
  return (
    <input
      type={type === undefined ? "text" : type}
      onChange={(e) => {
        change(e);
      }}
      value={value}
      className={twMerge(
        "text-neutral-950 text-lg w-[90%] p-2 m-2 bg-slate-50 rounded-lg max-w-[330px]",
        className
      )}
      placeholder={placeholder}
    />
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  change: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
};

export default TextInput;
