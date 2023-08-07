import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full bg-blue-700 flex flex-col items-center justify-center text-9xl text-white">
      <FontAwesomeIcon icon={faBarcode} className="animate-bounce" />
      <h1 className="text-3xl m-3">Loading... </h1>
    </div>
  );
};

export default Loading;
