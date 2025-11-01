import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(
    products.find((item) => parseInt(item.id) === parseInt(id))
  );
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const product = products.find((item) => parseInt(item.id) === parseInt(id));
    setSelectedProduct(product);
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === product?.category && item.id !== product?.id
      )
    );
  }, [id]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ProductDetails selectedProduct={selectedProduct} />
          <div className="mt-10">
            <ProductReviews selectedProduct={selectedProduct} />
          </div>
        </div>

        <section className="related-products bg-[#f9fafb] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              You might also like
            </h3>
            <ShopList productItems={relatedProducts} />
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Product;


