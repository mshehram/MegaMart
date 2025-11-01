import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);

  if (productItems.length === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold text-gray-700 my-10">
        Product Not Found !!
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {productItems.map((productItem) => (
        <ProductCard
          key={productItem.id}
          title={null}
          productItem={productItem}
        />
      ))}
    </div>
  );
};

export default memo(ShopList);


