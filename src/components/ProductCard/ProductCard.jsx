import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handleAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <div className="relative bg-white p-5 rounded-lg shadow-[0_1px_3px_rgba(3,0,71,0.09)] m-2">
      {title === "Big Discount" && productItem.discount && (
        <span className="absolute top-0 left-0 bg-[#0f3460] text-white text-[12px] rounded-full px-3 py-[3px] m-2">
          {productItem.discount}% Off
        </span>
      )}
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.imgUrl || productItem.image}
        alt={productItem.productName || productItem.name}
        className="w-full h-[200px] object-contain cursor-pointer"
      />
      <div className="absolute top-0 right-0 m-2 opacity-0 hover:opacity-100 transition duration-500">
        <ion-icon
          name="heart-outline"
          className="text-[20px] cursor-pointer"
        ></ion-icon>
      </div>
      <div className="mt-2">
        <h3
          onClick={handleClick}
          className="my-2 font-medium text-[17px] cursor-pointer"
        >
          {productItem.productName || productItem.name}
        </h3>
        <div className="flex mb-2">
          <i className="fa fa-star text-[#ffcd4e] text-[15px] mr-[5px]"></i>
          <i className="fa fa-star text-[#ffcd4e] text-[15px] mr-[5px]"></i>
          <i className="fa fa-star text-[#ffcd4e] text-[15px] mr-[5px]"></i>
          <i className="fa fa-star text-[#ffcd4e] text-[15px] mr-[5px]"></i>
          <i className="fa fa-star text-[#ffcd4e] text-[15px] mr-[5px]"></i>
        </div>
        <div className="flex justify-between items-center text-black">
          <h4 className="my-[10px]">${productItem.price || "0"}</h4>
          <button
            aria-label="Add"
            type="submit"
            onClick={() => handleAdd(productItem)}
            className="flex justify-center items-center w-[35px] h-[35px] border border-[rgba(3,0,71,0.09)] rounded-[5px] text-[#0f3460] text-[20px] hover:bg-[#0f3460] hover:text-white transition duration-500 rounded-full text-[25px]"
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
