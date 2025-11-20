import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Load all products from LocalStorage
    const storedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

    // Find selected product
    const product = storedProducts.find((item) => String(item.id) === String(id));
    setSelectedProduct(product);

    // Find related products
    if (product) {
      const related = storedProducts.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [id]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName || "Product Details"} />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ProductDetails selectedProduct={selectedProduct} />

          <div className="mt-10">
            <ProductReviews selectedProduct={selectedProduct} />
          </div>
        </div>

        {/* Related Products Section */}
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
