import { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "../Components/AddProduct";
// import IconButton from "../Components/IconButton";
import "../index.css";
import Barcode from "../Components/Barcode";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import Button from "../Components/Button";

const API = import.meta.env.VITE_API;

const testAPI = `${API}/product/EAN/`;

function Scanner() {
  const [product, setProduct] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [camera, setCamera] = useState(true);

  useEffect(() => {
    const haveCamera = async () => {
      let devices = await navigator.mediaDevices.enumerateDevices();

      devices = devices.filter((device) => device.kind === "videoinput").length;
      if (devices === 0 || devices.length === 0 || !devices) {
        console.log(devices);
        setCamera(false);
        setLoaded(true);
      } else {
        console.log(devices);
        setCamera(true);
        console.log("Masz Kamerę");
      }
    };
    haveCamera();
  });

  const NoCamera = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[100%] gap-4 max-w-[390px] md:gap-6 lg:max-w-[80%]">
        <h1 className=" text-center text-3xl text-white font-bold md:text-4xl ">
          Sorry but cannot use Camera
        </h1>
        <Button theme="add" classname="max-w-[270px]">
          Add by EAN code
        </Button>
      </div>
    );
  };

  const handleshowAddProduct = () => {
    setShowAddProduct((prev) => !prev);
  };

  const handleError = (message) => {
    setError(message);
  };

  const ApiCall = async (result) => {
    handleError(null);
    console.log("api call");
    let api = `${testAPI}${result}`;
    try {
      const data = await axios.get(api);
      let [product] = data.data;
      if (product === undefined || null) {
        console.log("Nie ma tego w baziu");
      } else {
        setProduct(product);
        setShowAddProduct(true);
      }
    } catch (err) {
      let message = err.response.data.message;
      handleError(message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-start h-[100%]">
      {!loaded && <Loading />}

      {camera ? (
        <Barcode
          handler={ApiCall}
          showAddProduct={showAddProduct}
          handleLoad={() => {
            setLoaded(true);
          }}
        />
      ) : (
        NoCamera()
      )}

      {showAddProduct && (
        <AddProduct close={handleshowAddProduct} product={product} />
      )}
      {error !== null && <Error timeout={2300}>{error}</Error>}
      {/* <IconButton
        theme="back"
        className="text-5xl text-slate-50 absolute bottom-2 left-1"
        handler={() => {
          ApiCall("5900497019316");
        }}
      /> */}
    </section>
  );
}

export default Scanner;
