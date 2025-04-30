import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPanel from './AdminPanel';
import ProductDetail from "./ProductDetail";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">მთავარი გვერდი</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/admin" element={<AdminPanel onAddProduct={addProduct} />} />
		   <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
	  
    </Router>
  );
}

export default App;