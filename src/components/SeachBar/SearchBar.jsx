import { useState } from "react";
import { products } from "../../utils/products";

const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState(null);

  const handelChange = (input) => {
    setSearchWord(input.target.value);
    setFilterList(
      products.filter((item) =>
        item.productName?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };

  return (
    <div className="relative flex items-center max-w-[650px] h-10 px-4 rounded-2xl bg-[#f2f2f2]">
      <input
        type="text"
        placeholder="Search..."
        onChange={handelChange}
        className="w-full h-full px-2 text-[16px] text-[#333] outline-none bg-transparent border-none"
      />
      <ion-icon
        name="search-outline"
        className="absolute right-4 text-[20px] text-[#999] cursor-pointer"
      ></ion-icon>
    </div>
  );
};

export default SearchBar;


