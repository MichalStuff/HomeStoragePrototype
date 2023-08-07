import ProductItem from "./ProductItem";
import ProductInfo from "./ProductInfo";
import PropTypes from "prop-types";

const ProductList = ({ products }) => {
  const handleProduct = (product) => {
    console.log(product);
    return <ProductInfo product={product} />;
  };

  const Products = () => {
    return products.map((item, index) => {
      if (item.quantity > 0) {
        return (
          <ProductItem key={index} product={item} handler={handleProduct} />
        );
      } else {
        return (
          <ProductItem key={index} product={item} handler={handleProduct} />
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-start mt-16 w-full h-full md:pt-4 lg:pt-8">
      <ul className="inline-grid grid-cols-3 gap-3 p-3 md:grid-cols-5 md:gap-5 xl:grid-cols-7">
        {Products()}
      </ul>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
