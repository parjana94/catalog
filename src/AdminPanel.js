import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from './firebase';
import './styles.css';

const AdminPanel = () => {
  const [product, setProduct] = useState({
    name: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsRef = ref(db, 'products');
      const newProductRef = push(productsRef);
      await set(newProductRef, product);
      alert('პროდუქტი წარმატებით დაემატა!');
      setProduct({
        name: '',
        shortDescription: '',
        description: '',
        imageUrl: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
      });
    } catch (error) {
      console.error('დამატების შეცდომა:', error);
      alert('პროდუქტის დამატება ვერ მოხერხდა.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>პროდუქტის დამატება</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">დასახელება:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="shortDescription">მოკლე აღწერა:</label>
          <input type="text" id="shortDescription" name="shortDescription" value={product.shortDescription} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="description">სრული აღწერა:</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="imageUrl">მთავარი სურათი:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="image1">დამატებითი ფოტო 1:</label>
          <input type="text" id="image1" name="image1" value={product.image1} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="image2">დამატებითი ფოტო 2:</label>
          <input type="text" id="image2" name="image2" value={product.image2} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="image3">დამატებითი ფოტო 3:</label>
          <input type="text" id="image3" name="image3" value={product.image3} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="image4">დამატებითი ფოტო 4:</label>
          <input type="text" id="image4" name="image4" value={product.image4} onChange={handleChange} />
        </div>

        <button type="submit">დამატება</button>
      </form>
    </div>
  );
};

export default AdminPanel;
