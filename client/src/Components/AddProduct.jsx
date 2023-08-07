import { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import IconButton from "./IconButton";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useUserProductContext } from "../Hooks/useUserProductContext";

const AddProduct = ({ close, product }) => {
  const API = import.meta.env.VITE_API;

  const { user } = useAuthContext();
  const { userItems, dispatch } = useUserProductContext();

  const { title, images, description, online_stores, EAN } = product;

  const [quantity, setQuantity] = useState(1);
  const [showDesc, setShowDesc] = useState(false);
  const [showStores, setShowStores] = useState(false);

  //Displays Online Sotres
  const onlineStores = () => {
    return online_stores.map((item, index) => {
      return (
        <span key={index} className="flex justify-between pt-1 p-5">
          <p className="text-lg font-medium ">Shop : {item.name}</p>
          <p className="text-lg font-medium">Price : {item.price}</p>
        </span>
      );
    });
  };
  // Show/Hide Descrtiption
  const handleDesc = () => {
    setShowDesc((prev) => !prev);
    if (showStores === true) setShowStores((prev) => !prev);
  };
  // Show/Hide Descrtiption
  const handleShop = () => {
    setShowStores((prev) => !prev);
    if (showDesc === true) setShowDesc((prev) => !prev);
  };

  // Adds produt or update product
  const updateProduct = async () => {
    if (quantity === 0) return;
    // console.log(quantity);
    const response = await fetch(`${API}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ product_id: product._id, quantity: quantity }),
    });
    // console.log(response);
    let newProduct = userItems.filter((item) => item._id === product._id);
    if (newProduct.lenght > 0) {
      newProduct = newProduct[0];
      newProduct.quantity += quantity;
      dispatch({ type: "UPDATE_ITEMS", payload: newProduct });
    } else {
      dispatch({ type: "UPDATE_ITEMS", payload: { ...product, quantity } });
    }
    close();
  };

  //Increase o product  quantity
  const increaseQuantity = () => {
    setQuantity((prev) => (prev += 1));
  };
  // Deacrease o product  quantity
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => (prev -= 1));
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center absolute w-[90svw] max-h-[80svh] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-lg rounded-2xl max-w-[390px]">
      <IconButton
        handler={close}
        theme="cancel"
        className="text-3xl text-red-600 p-2 absolute top-0 right-0"
      />
      <h1 className="text-center text-2xl font-bold py-2 w-[75%]">{title}</h1>
      <div className="flex flex-col items-center flex-grow-1 w-full h-5/6 overflow-scroll	scrollbar-hide">
        <img
          className="p-3 w-[70%] object-contain max-w-[270px] max-h-[270px]"
          src={images[0]}
          alt={title}
        />
        <h2 className="text-xl font-medium p-3">EAN : {EAN}</h2>
        <span className="flex justify-around text-3xl  w-[90%]">
          <IconButton
            handler={() => {
              decreaseQuantity();
            }}
            theme="remove"
            className=" text-red-600"
          />
          <h2 className=" text-2xl font-medium">Quantity : {quantity}</h2>
          <IconButton
            handler={() => {
              increaseQuantity();
            }}
            theme="add"
            className=" text-green-600"
          />
        </span>
        <div className="w-[90%]">
          <span
            onClick={handleDesc}
            className=" flex justify-between items-center mx-auto mt-3 p-3 px-5 bg-slate-700  rounded-lg text-xl"
          >
            <h2 className=" text-left text-slate-50">Description</h2>
            {showDesc === false ? (
              <FontAwesomeIcon
                className="text-slate-50"
                icon={faChevronCircleDown}
              />
            ) : (
              <FontAwesomeIcon
                className="text-slate-50"
                icon={faChevronCircleUp}
              />
            )}
          </span>
          {showDesc === true ? (
            <span>
              <p className="py-2 px-1">{description}</p>
            </span>
          ) : null}
          <span
            onClick={handleShop}
            className=" flex justify-between items-center mx-auto mt-3 p-3 px-5 bg-slate-700  rounded-lg text-xl"
          >
            <h2 className=" text-left text-slate-50">Online Stores</h2>
            {showStores === false ? (
              <FontAwesomeIcon
                className="text-slate-50"
                icon={faChevronCircleDown}
              />
            ) : (
              <FontAwesomeIcon
                className="text-slate-50"
                icon={faChevronCircleUp}
              />
            )}
          </span>
          {showStores === true ? onlineStores() : null}
        </div>
      </div>
      <Button
        theme={"add"}
        handler={() => {
          updateProduct();
        }}
        classname={`m-3`}
      >
        Add Product
      </Button>
    </div>
  );
};

AddProduct.propTypes = {
  close: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default AddProduct;
