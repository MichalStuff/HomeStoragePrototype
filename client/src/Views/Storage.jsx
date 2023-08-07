import { useUserProductContext } from "../Hooks/useUserProductContext";
import ProductList from "../Components/ProductLIst";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Storage = () => {
  const { userItems } = useUserProductContext();
  const [activeProducts, setActiveProducts] = useState([]); // Array of products where Quantity > 0
  const [oldProducts, setOldProducts] = useState([]); // Array of products where Quantity === 0
  const [showNewProduct, setShowNewProduct] = useState(false);

  const handlesShowNewProduct = () => {
    setShowNewProduct((prev) => (prev = !prev));
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userItems);
    let active = userItems.filter((item) => item.quantity > 0);
    let old = userItems.filter((item) => item.quantity === 0);
    // if (activeProducts.length !== active.length) setActiveProducts(active);

    setActiveProducts(active);
    setOldProducts(old);
  }, [userItems]);

  const Empty = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-evenly m-auto w-[75%] h-[100%] text-white font-semibold">
          <h1 className="text-center text-5xl ">
            Your Storage seems to be empty
          </h1>
          <Button
            theme="add"
            handler={() => {
              navigate("/scan");
            }}
          >
            Add new Product?
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      {activeProducts.length !== 0 ? (
        <section className="min-h-[100%] max-w-[100%]">
          <div className="flex absolute  top-2 left-1/2 translate-x-[-50%] w-full max-w-[370px]">
            <Button
              theme={showNewProduct === true ? "primary" : "secondary"}
              handler={handlesShowNewProduct}
            >
              New
            </Button>
            <Button
              theme={showNewProduct === true ? "secondary" : "primary"}
              handler={handlesShowNewProduct}
            >
              Old
            </Button>
          </div>
          {showNewProduct === false ? (
            <ProductList products={activeProducts} />
          ) : (
            <ProductList products={oldProducts} />
          )}
        </section>
      ) : (
        Empty()
      )}
    </>
  );
};

export default Storage;
