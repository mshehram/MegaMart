import { Fragment, useState, useEffect } from "react";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useWindowScrollToTop();

  useEffect(() => {
    const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setAllProducts(adminProducts);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilterList(allProducts.filter((item) => item.category === selectedCategory));
    } else {
      setFilterList(allProducts);
    }
  }, [allProducts, selectedCategory]);

  return (
    <Fragment>
      <Banner title="Products" />

      <section className="filter-bar bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            
            <div className="w-full md:w-1/3">
              <FilterSelect 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={allProducts}
              />
            </div>

            <div className="w-full md:w-2/3">
              <SearchBar setFilterList={setFilterList} products={allProducts} />
            </div>

          </div>

          <ShopList productItems={filterList} />

        </div>
      </section>
    </Fragment>
  );
};

export default Shop;
