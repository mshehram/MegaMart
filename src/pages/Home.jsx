import { Fragment, useState, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  useWindowScrollToTop();

  const [bigDiscountProducts, setBigDiscountProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setBigDiscountProducts(savedProducts.filter((p) => p.section === "big discount"));
    setNewArrivalProducts(savedProducts.filter((p) => p.section === "new arrivals"));
    setBestSalesProducts(savedProducts.filter((p) => p.section === "best sales"));
  }, []);

  return (
    <Fragment>
      <div className="bg-white w-full min-h-screen overflow-x-hidden">
        <div className="w-full">
          <SliderHome />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Wrapper />
        </div>

        <div className="bg-[#f6f9fc] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section
              title="Big Discount"
              bgColor="#f6f9fc"
              productItems={bigDiscountProducts}
            />
          </div>
        </div>

        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section
              title="New Arrivals"
              bgColor="white"
              productItems={newArrivalProducts}
            />
          </div>
        </div>

        <div className="bg-[#f6f9fc] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section
              title="Best Sales"
              bgColor="#f6f9fc"
              productItems={bestSalesProducts}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
