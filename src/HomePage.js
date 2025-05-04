import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "./firebase";
import { Link } from "react-router-dom";
import "./styles.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("ყველა");

  const categories = ['ყველა', 'ბლენდერი','გრილი','ვინტილატორი','თმის საკრეჭი','მიკროტალღური','მიქსერი',
    'მტვერსასრუტი','ყავის აპარატი','საცხობი ღუმელი','ტაფები','ტელევიზორი','ტოსტერი','უთო','ფენი','ქვაბები','ჩაიდანი',
    'ჩოფერი','წვენსაწური','წვერის საპარსი', 'ხორცის მანქანა','სხვა',];

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productList);
      }
    });
  }, []);

  const filteredProducts =
    filteredCategory === "ყველა"
      ? products
      : products.filter((p) => p.category === filteredCategory);

  return (
    <div className="container">
      <h1 className="main-title">პროდუქტების კატალოგი</h1>

      <div className="filter-container">
        <label htmlFor="categoryFilter">კატეგორიის ფილტრი:</label>
        <select
          id="categoryFilter"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-title">{product.name}</h3>
                <p className="product-category">{product.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>პროდუქტები არ არის</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
