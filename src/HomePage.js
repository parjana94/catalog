import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "./firebase";
import { Link } from "react-router-dom";
import "./styles.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container">
      <h1 className="main-title">პროდუქტების კატალოგი</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-title">{product.name}</h3>
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
