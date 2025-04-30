import React, { useState } from 'react';
import { db } from './firebase';
import { ref, push } from 'firebase/database';

function AdminPanel() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('electronics');

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price,
      category,
    };

    const productRef = ref(db, 'products');
    push(productRef, product);

    setName('');
    setDescription('');
    setPrice('');
    setCategory('electronics');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="electronics">Electronics</option>
            <option value="home">Home Appliances</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminPanel;