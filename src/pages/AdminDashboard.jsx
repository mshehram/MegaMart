import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    section: "",
    price: "",
    discount: "",
    file: null,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setProducts(saved);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, file: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.category.trim() ||
      !form.section.trim() ||
      !form.price.trim() ||
      !form.file
    ) {
      alert("Please fill all required fields before uploading.");
      return;
    }

    const sections = ["shop"];
    if (form.section && form.section !== "shop") sections.push(form.section.toLowerCase());

    const newProducts = sections.map((sec) => ({
      id: Date.now() + Math.random(),
      productName: form.name,
      description: form.description,
      category: form.category.toLowerCase(),
      section: sec,
      imgUrl: form.file,
      price: form.price,
      discount: sec === "big discount" ? form.discount || "0" : "0",
    }));

    const updatedProducts = [...products, ...newProducts];
    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    setForm({
      name: "",
      description: "",
      category: "",
      section: "",
      price: "",
      discount: "",
      file: null,
    });
  };

  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
  };

  return (
    <section className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0f3460] tracking-tight">
            Admin Dashboard
          </h1>
          <span className="text-gray-500 text-sm">
            Manage your store products efficiently
          </span>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-[#0f3460] mb-6">
              Add New Product
            </h2>

            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f3460] outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <textarea
                placeholder="Description"
                rows="2"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f3460] outline-none resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f3460] outline-none"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="chair">Chair</option>
                  <option value="mobile">Mobile</option>
                  <option value="wireless">Wireless</option>
                  <option value="watch">Watch</option>
                </select>

                <select
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f3460] outline-none"
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                >
                  <option value="">Select Section</option>
                  <option value="shop">Shop</option>
                  <option value="big discount">Big Discount</option>
                  <option value="new arrivals">New Arrivals</option>
                  <option value="best sales">Best Sales</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f3460] outline-none"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                {form.section === "big discount" && (
                  <input
                    type="number"
                    placeholder="Discount %"
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f3460] outline-none"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#0f3460] outline-none"
              />

              <button
                type="submit"
                className="w-full bg-[#0f3460] hover:bg-[#162a4d] text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Upload Product
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-[#0f3460] mb-6">
              Product List
            </h2>

            {products.length === 0 ? (
              <p className="text-center text-gray-500 text-lg py-10">
                No products uploaded yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl shadow hover:shadow-xl transition overflow-hidden relative group"
                  >
                    <img
                      src={item.imgUrl}
                      alt={item.productName}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-[#0f3460] truncate">
                          {item.productName}
                        </h3>
                        <div className="text-right">
                          <p className="text-[#0f3460] font-bold">${item.price}</p>
                          {item.discount > 0 && (
                            <p className="text-red-500 text-sm">-{item.discount}%</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-1 mt-2">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.category} • {item.section}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
