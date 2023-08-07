// import React, { useEffect, useRef, useState } from "react";
// import { BrowserCodeReader, BrowserMultiFormatReader } from "@zxing/browser";

// const BarecodeResult = async (
//   videoRef, // Reference to the video
//   setLastResult, // Sets result
//   delayScan = 300, // Delay of Scan (no Succes)
//   delayAfterSuccess = 300, // Delay of Scan after Success
//   handler // Function to handle after Successfull Scan
// ) => {
//   let options = {
//     delayBetweenScanAttempts: delayScan,
//     delayBetweenScanSuccess: delayAfterSuccess,
//   };
//   const codeReader = new BrowserMultiFormatReader(null, options);
//   console.log(codeReader);

//   const videoInputDevices = await BrowserCodeReader.listVideoInputDevices();

//   let constraints = {
//     audio: false,
//     video: {
//       facingMode: "environment",
//     },
//   };

//   const controls = await codeReader.decodeFromConstraints(
//     constraints,
//     videoRef.current,
//     (result, error) => {
//       if (result != undefined) {
//         setLastResult(result.text);
//         handler(result);
//       }
//       // if (error) console.log(error);
//     }
//   );
// };

// const Barecode = ({ handler }) => {
//   const [lastResult, setLastResult] = useState(null);
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   useEffect(() => {
//     BarecodeResult(videoRef, setLastResult, 300, 1600, handler);
//   }, []);

//   return (
//     <>
//       <div className="flex flex-wrap items-center">
//         <video ref={videoRef} className="  " />
//         {/* <canvas ref={canvasRef} className="w-[90lvw] h-[90lvw] block"></canvas> */}
//         <p>
//           <span>Last result:</span>
//           <span>{lastResult}</span>
//         </p>
//       </div>
//     </>
//   );
// };

// export default Barecode;

import { useEffect, useRef, useState } from "react";
import { BrowserCodeReader, BrowserMultiFormatReader } from "@zxing/browser";

const Barecode = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const constraints = {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 400, ideal: 1080 },
    frameRate: { max: 30 },
    facingMode: "environment",
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: constraints,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.scrObject = stream;
        video.play();
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);
  // const drawCamera = () => {};

  // useEffect(() => {
  //   const getVideo = async () => {
  //     const display = await navigator.mediaDevices
  //       .getUserMedia({
  //         video: { facingMode: "environment" },
  //       })
  //       .then((stream) => {
  //         let video = videoRef.current;
  //         video.srcObject = stream;
  //         // video.play();
  //         return stream;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     let camera = display.getVideoTracks()[0].getSettings();
  //     console.log(videoRef);
  //     console.log(camera);
  //     canvasRef.current.width = camera.width; // Set up Canvas Width to the Camera Width
  //     canvasRef.current.height = camera.height; //Set up Canvas Height to the Camera Height
  //     const context = canvasRef.current.getContext("2d");
  //     const draw = () => {
  //       if (camera) {
  //         context.drawImage(videoRef.current, 0, 0);

  //         window.requestAnimationFrame(draw);
  //       }
  //     };
  //     draw();
  //   };
  //   getVideo();
  // }, [videoRef]);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] h-full">
      <video ref={videoRef} className=" " />
      <canvas ref={canvasRef} className={`w-[100%] h-auto `} />
    </div>
  );
};

export default Barecode;
