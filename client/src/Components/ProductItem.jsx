import { useState } from "react";
import ProductInfo from "./ProductInfo";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const ProductItem = ({ product, className }) => {
  const { title, images, quantity } = product;
  const [showProductInfo, setShowProductInfo] = useState(false);

  const handleProductInfo = () => {
    setShowProductInfo((prev) => !prev);
  };

  return (
    <>
      <li
        onClick={() => handleProductInfo()}
        className={twMerge(
          "flex  flex-col justify-between bg-white p-2 text-center rounded-xl max-w-[126px] max-h-[160px] md:max-w-[150px] md:max-h-[180px]",
          className
        )}
      >
        <img
          src={images[0]}
          alt={title}
          className="max-h-[110px] object-contain md:max-h-[130px]"
        />
        <p className="pt-2 font-bold text-sm">Quantitiy : {quantity}</p>
      </li>
      {showProductInfo && (
        <ProductInfo product={product} close={handleProductInfo} />
      )}
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.array,
};

export default ProductItem;
