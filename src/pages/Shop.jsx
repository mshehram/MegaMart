import { Fragment, useState } from "react";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  const [filterList, setFilterList] = useState(
    products.filter((item) => item.category === "sofa")
  );

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="Products" />

      <section className="filter-bar bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="w-full md:w-1/3">
              <FilterSelect setFilterList={setFilterList} />
            </div>
            <div className="w-full md:w-2/3">
              <SearchBar setFilterList={setFilterList} />
            </div>
          </div>

        
          <ShopList productItems={filterList} />
        </div>
      </section>
    </Fragment>
  );
};

export default Shop;
