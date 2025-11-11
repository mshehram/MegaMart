import { memo } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  if (!productItems || productItems.length === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold text-gray-700 my-10">
        Product Not Found !!
      </h1>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productItems.map((productItem) => (
          <ProductCard
            key={productItem.id}
            productItem={{
              ...productItem,
              imgUrl: productItem.imgUrl || productItem.image || productItem.file || "/placeholder.png",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ShopList);
