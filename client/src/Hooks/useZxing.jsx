import { BrowserMultiFormatReader } from "@zxing/library";
// import { BrowserCodeReader } from "@zxing/browser";
import { useEffect, useMemo, useRef } from "react";

let defualt = {
  constraints: {
    audio: false,
    video: {
      facingMode: "environment",
    },
  },
  timeBetweenDecodingAttempts: 300,
  onResult: () => {
    console.log("Add OnResult Function [Result handling function]");
  },
  onError: () => {
    console.log("Add onError Function [Result error function]");
  },
  onLoad: () => {
    console.log("Loaded");
  },
  show: true,
};

export const useZxing = ({
  constraints = defualt.constraints,
  hints,
  timeBetweenDecodingAttempts = defualt.timeBetweenDecodingAttempts,
  onResult = defualt.onResult,
  onError = defualt.onError,
  onLoad = defualt.onLoad,
  show = defualt.show,
}) => {
  const videoRef = useRef();

  const reader = useMemo(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!videoRef.current) return;

    reader
      .decodeFromConstraints(constraints, videoRef.current, (result, error) => {
        if (result && !show) {
          console.log(show);
          onResult(result);
        }
        if (error) onError(error);
      })
      .then(() => {
        onLoad();
      });
    return () => {
      reader.reset();
    };
  }, [videoRef, show]);

  return { videoRef };
};
