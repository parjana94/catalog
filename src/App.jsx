// App.jsx
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue, push } from "firebase/database";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data).map(([id, item]) => ({ id, ...item }));
        setProducts(loaded);
      } else {
        setProducts([]);
      }
    });
  }, []);

  const handleAddProduct = () => {
    const productsRef = ref(db, "products");
    push(productsRef, newProduct);
    setNewProduct({ name: "", description: "", price: "", image: "", category: "" });
  };

  const filtered = products.filter((p) => {
    return (
      (category === "all" || p.category === category) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const uniqueCategories = ["all", ...new Set(products.map((p) => p.category))];

  return (
   <div className="app-wrapper">
    <div className="app-container">
	<div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📦 საოჯახო ტექნიკის კატალოგი</h1>

      <div className="mb-4 flex gap-2">
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border ${category === cat ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="ძიება..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-2 rounded" />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-lg font-bold mt-1">₾{p.price}</p>
            <a
              href={`https://wa.me/9955xxxxxxxx?text=ვინტერესდები ${p.name} პროდუქტის შესახებ`}
              target="_blank"
              className="inline-block mt-2 text-blue-600 underline"
            >
              დაგვიკავშირდი WhatsApp-ით
            </a>
          </div>
        ))}
      </div>
	</div>
	</div>

      <h2 className="text-2xl font-bold mt-10 mb-4">➕ დაამატე პროდუქტი (Admin პანელი)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          className="border p-2 rounded"
          placeholder="დასახელება"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="აღწერა"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="ფასი"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="სურათის ბმული"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="კატეგორია (მაგ. მაცივრები)"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleAddProduct}
      >
        + დამატება
      </button>
    </div>
  );
}

export default App;