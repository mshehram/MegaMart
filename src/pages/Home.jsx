import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import {
  discountProducts,
  newArrivals,
  bestSales,
} from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  useWindowScrollToTop();

  return (
    <Fragment>
      <div className="bg-white w-full min-h-screen">
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
              productItems={discountProducts}
            />
          </div>
        </div>

        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section
              title="New Arrivals"
              bgColor="white"
              productItems={newArrivals}
            />
          </div>
        </div>

        <div className="bg-[#f6f9fc] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section
              title="Best Sales"
              bgColor="#f6f9fc"
              productItems={bestSales}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
