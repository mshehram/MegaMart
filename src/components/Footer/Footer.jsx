const Footer = () => {
  return (
    <footer className="bg-[#0f3460] text-white py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1.5fr] gap-8 justify-center">
        {/* Logo Section */}
        <div className="px-5">
          <div className="flex items-center gap-2 mb-5">
            <ion-icon name="bag"></ion-icon>
            <h1 className="text-[25px] font-extrabold w-max">MegaMart</h1>
          </div>
          <p className="text-[16px] mb-5 opacity-50 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
            libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et
            lectus vel ut sollicitudin elit at amet.
          </p>
        </div>

        <div className="px-5">
          <h2 className="text-[20px] mb-5">About Us</h2>
          <ul className="p-0">
            <li className="mb-2 opacity-50">Careers</li>
            <li className="mb-2 opacity-50">Our Stores</li>
            <li className="mb-2 opacity-50">Our Cares</li>
            <li className="mb-2 opacity-50">Terms & Conditions</li>
            <li className="mb-2 opacity-50">Privacy Policy</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="px-5">
          <h2 className="text-[20px] mb-5">Customer Care</h2>
          <ul className="p-0">
            <li className="mb-2 opacity-50">Help Center</li>
            <li className="mb-2 opacity-50">How to Buy</li>
            <li className="mb-2 opacity-50">Track Your Order</li>
            <li className="mb-2 opacity-50">Corporate & Bulk Purchasing</li>
            <li className="mb-2 opacity-50">Returns & Refunds</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="px-5 min-w-[200px]">
          <h2 className="text-[20px] mb-5">Contact Us</h2>
          <ul className="p-0">
            <li className="mb-2 opacity-50">
              Near Tehsil Chowk, Chakwal, Punjab, Pakistan Postal Code: 48800
            </li>
            <li className="mb-2 opacity-50">Email: m.shehram01@gmail.com</li>
            <li className="mb-2 opacity-50">Phone: 0314 7725250</li>
            <li className="mb-2 opacity-50">Phone: 0314 7725250</li>
            <li className="mb-2 opacity-50">Phone: 0314 7725250</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


