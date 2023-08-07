import { useState } from "react";
import Button from "../Components/Button";
import TextInput from "../Components/TextInput";
import Error from "../Components/Error";
import AddProduct from "../Components/AddProduct";
import axios from "axios";

const API = import.meta.env.VITE_API;
const testAPI = `${API}/product/EAN/`;

const Add = () => {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [product, setProduct] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleshowAddProduct = () => {
    setShowAddProduct((prev) => !prev);
  };

  const handleError = (code) => {
    if (code.length < 13) {
      setError("Code is to short");
      return true;
    } else if (code.length > 13) {
      setError("Code is to long");
      return true;
    }
    return false;
  };
  const clearError = () => {
    setError("");
  };

  const handleChange = (e, upateState) => {
    upateState(e.target.value);
    if (error !== null) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleError(code)) {
      console.log(code);
      ApiCall(code);
    }
  };

  const ApiCall = async (code) => {
    setError("");
    console.log("api call");
    let api = `${testAPI}${code}`;
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
      console.log(message);
      setError(message);
    }
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <h1 className=" text-3xl text-slate-50 font-roboto text-center my-4 md:text-4xl md:mb-8 xl:text-5xl xl:mb-10">
        Add product by EAN code
      </h1>
      <TextInput
        type="number"
        placeholder="EAN Code"
        change={(e) => {
          handleChange(e, setCode);
        }}
        value={code}
      />
      <Button theme="add" classname="" handler={() => {}}>
        Search
      </Button>
      {showAddProduct && (
        <AddProduct close={handleshowAddProduct} product={product} />
      )}
      {error && <Error>{error}</Error>}
    </form>
  );
};

export default Add;
