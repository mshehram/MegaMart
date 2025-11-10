import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else if (window.scrollY <= 50) {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <nav
      className={`${
        isFixed ? "fixed top-0 left-0 w-screen" : "relative"
      } bg-white shadow-[0_10px_10px_rgba(9,5,29,0.171)] text-[1.2rem] transition-all duration-300 z-50`}
    >
      <div className="max-w-[78rem] mx-auto flex justify-between items-center px-4 py-3">
        
        <Link to="/" className="flex items-center justify-start gap-2">
          <ion-icon name="bag"></ion-icon>
          <h1 className="text-black text-[25px] font-medium m-0">MegaMart</h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex items-center gap-4 text-[18px] font-semibold">
            <li>
              <Link
                to="/"
                className="text-black flex items-center gap-1 px-2 py-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="text-black flex items-center gap-1 px-2 py-1"
              >
                Shop
              </Link>
            </li>
          </ul>

          
          <div className="flex items-end gap-2 ml-auto">
         
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="w-[30px] h-[30px] pb-[5px]"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>

            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              data-num={cartList.length}
              className="relative before:content-[attr(data-num)] before:absolute before:-top-1 before:-right-1 before:bg-[#0f3460] before:text-white before:text-[11px] before:w-4 before:h-4 before:flex before:items-center before:justify-center before:rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-[30px] h-[30px] pb-[5px]"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </Link>
          </div>
        </div>

        <button
          onClick={() => setExpand(!expand)}
          className="flex flex-col justify-center items-center space-y-1 sm:hidden"
        >
          <span
            className={`block bg-black transition-all duration-300 ${
              expand ? "rotate-45 translate-y-[7px] w-[27px] h-[4px]" : "w-[27px] h-[4px]"
            }`}
          ></span>
          <span
            className={`block bg-black transition-all duration-300 ${
              expand ? "opacity-0" : "opacity-100 w-[27px] h-[4px]"
            }`}
          ></span>
          <span
            className={`block bg-black transition-all duration-300 ${
              expand ? "-rotate-45 -translate-y-[7px] w-[27px] h-[4px]" : "w-[27px] h-[4px]"
            }`}
          ></span>
        </button>
      </div>

  
      {expand && (
        <div className="sm:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 text-[18px] font-semibold">
            <li>
              <Link
                to="/"
                onClick={() => setExpand(false)}
                className="text-black px-2 py-2 block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => setExpand(false)}
                className="text-black px-2 py-2 block"
              >
                Shop
              </Link>
            </li>
            <li className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-[30px] h-[30px]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>

              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                data-num={cartList.length}
                className="relative before:content-[attr(data-num)] before:absolute before:-top-1 before:-right-1 before:bg-[#0f3460] before:text-white before:text-[11px] before:w-4 before:h-4 before:flex before:items-center before:justify-center before:rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="w-[30px] h-[30px]"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
