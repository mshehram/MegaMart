import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  const handleAdd = () => {
    if (!selectedProduct) return;

    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-center md:gap-10">
        
        {/* LEFT IMAGE SECTION */}
        <div className="w-full md:w-1/2">
          <img
            loading="lazy"
            src={
              selectedProduct?.imgUrl ||
              selectedProduct?.image ||
              selectedProduct?.file ||
              "/placeholder.png"
            }
            alt={selectedProduct?.productName || "Product Image"}
            className="w-full h-full object-contain"
          />
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold">
            {selectedProduct?.productName}
          </h2>

          <div className="flex items-center my-5 gap-10">
            {/* Static Stars */}
            <div className="flex">
              <i className="fa fa-star text-[#ffcd4e] text-[12px] mr-[5px]"></i>
              <i className="fa fa-star text-[#ffcd4e] text-[12px] mr-[5px]"></i>
              <i className="fa fa-star text-[#ffcd4e] text-[12px] mr-[5px]"></i>
              <i className="fa fa-star text-[#ffcd4e] text-[12px] mr-[5px]"></i>
              <i className="fa fa-star text-[#ffcd4e] text-[12px] mr-[5px]"></i>
            </div>

            <span>{selectedProduct?.avgRating} ratings</span>
          </div>

          <div className="flex gap-10 items-center">
            <span className="text-[25px] font-medium">
              ${selectedProduct?.price}
            </span>
            <span>category: {selectedProduct?.category}</span>
          </div>

          <p className="text-[14px] my-5">
            {selectedProduct?.shortDesc}
          </p>

          {/* Quantity + Add to cart */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 my-5">
            <input
              type="number"
              placeholder="Qty"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className="w-[80px] h-[36px] border border-black rounded-md p-2 text-black text-[15px]"
            />

            <button
              aria-label="Add"
              type="button"
              onClick={handleAdd}
              className="h-[40px] px-6 bg-[#0f3460] text-white text-[17px] rounded-md"
            >
              Add To Cart
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;
