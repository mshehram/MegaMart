// Updated AdminDashboard.js with UI changes
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
    const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    const savedCategories = JSON.parse(localStorage.getItem("adminCategories")) || [];

    setProducts(savedProducts);
    setCategories(savedCategories);
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
      alert("Please fill all fields including category!");
      return;
    }

    const cat = form.category.toLowerCase();

    let updatedCategories = categories;
    if (!categories.includes(cat)) {
      updatedCategories = [...categories, cat];
      setCategories(updatedCategories);
      localStorage.setItem("adminCategories", JSON.stringify(updatedCategories));
    }

    const newProduct = {
      id: Date.now() + Math.random(),
      productName: form.name,
      description: form.description,
      category: cat,
      section: form.section,
      imgUrl: form.file,
      price: form.price,
      discount: form.section === "big discount" ? form.discount || "0" : "0",
    };

    const updatedProducts = [...products, newProduct];

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
          <h1 className="text-4xl font-extrabold text-[#0f3460]">Admin Dashboard</h1>
        </header>

        {/* LEFT = Add New Product, RIGHT = Products Table */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ADD PRODUCT FORM (LEFT SIDE) */}
          <div className="bg-white shadow-lg rounded-2xl p-6 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-[#0f3460] mb-6">Add New Product</h2>

            <form onSubmit={handleUpload} className="space-y-4">
              <input type="text" placeholder="Product Name" className="w-full border p-3 rounded-lg"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <textarea placeholder="Description" className="w-full border p-3 rounded-lg"
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

              <input type="text" placeholder="Enter Category" className="w-full border p-3 rounded-lg"
                value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />

              <select className="w-full border p-3 rounded-lg" value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}>
                <option value="">Select Section</option>
                <option value="shop">Shop</option>
                <option value="big discount">Big Discount</option>
                <option value="new arrivals">New Arrivals</option>
                <option value="best sales">Best Sales</option>
              </select>

              <input type="number" placeholder="Price" className="w-full border p-3 rounded-lg"
                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />

              {form.section === "big discount" && (
                <input type="number" placeholder="Discount %" className="w-full border p-3 rounded-lg"
                  value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
              )}

              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-3 rounded-lg" />

              <button type="submit" className="w-full bg-[#0f3460] text-white py-3 rounded-lg">Upload Product</button>
            </form>
          </div>

          {/* PRODUCTS TABLE (RIGHT SIDE) */}
          <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-[#0f3460]">Products</h2>

            {products.length === 0 ? (
              <p className="text-gray-500">No products added yet.</p>
            ) : (
              <table className="w-full border-collapse border text-sm">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td className="border p-2">
                        <img src={item.imgUrl} alt={item.productName} className="w-14 h-14 object-cover rounded" />
                      </td>
                      <td className="border p-2 font-semibold">{item.productName}</td>
                      <td className="border p-2 capitalize">{item.category}</td>
                      <td className="border p-2 text-gray-600">{item.description}</td>
                      <td className="border p-2 font-bold text-[#0f3460]">${item.price}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;