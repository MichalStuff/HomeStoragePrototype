import { useEffect, useRef, useState } from "react";
import { useZxing } from "../Hooks/useZxing";
import beep from "../assets/beep.mp3";
import PropTypes from "prop-types";

const Barcode = ({ handler, showAddProduct, handleLoad }) => {
  const hints = new Map();

  const [frame, setFrame] = useState(false);

  const canvasRef = useRef();

  const onError = () => {};
  const { videoRef } = useZxing({
    hints,
    onResult: (result) => {
      new Audio(beep).play();
      handler(result);
    },
    onError,
    onLoad: () => {
      handleLoad();
      setFrame(true);
    },
    show: showAddProduct,
  });
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      canvas.height = videoRef.current.videoWidth / 3.5;
      canvas.width = videoRef.current.videoWidth / 2.5;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    if (frame) {
      draw();
    } else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [frame, showAddProduct]);

  return (
    <div className="flex flex-col items-center justify-center h-[80%] m-0 p-0 max-w-[390px] lg:max-w-[100%]">
      <video
        className="w-[90%] m-0 p-0"
        ref={videoRef}
        onClick={() => {
          setFrame((prev) => !prev);
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute"
        onClick={() => {
          setFrame((prev) => !prev);
        }}
      />
    </div>
  );
};

Barcode.propTypes = {
  handler: PropTypes.func.isRequired,
  showAddProduct: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func,
};

export default Barcode;
