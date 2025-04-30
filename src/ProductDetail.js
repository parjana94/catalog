import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, ref, onValue } from './firebase';
import './styles.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const productRef = ref(db, `products/${id}`);
    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      setProduct(data);
    });
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  // გადააქცევს \n-ით გამოყოფილ ტექსტს მრავალ ხაზად JSX-ში
  const formattedDescription = product.description
    .split('\n')
    .map((line, index) => <p key={index}>{line}</p>);

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Images */}
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="main-image"
            />
          </div>

          <div className="thumbnail-images">
            {[product.image1, product.image2, product.image3, product.image4].map(
              (img, index) =>
                img && (
                  <img
                    key={index}
                    src={img}
                    alt={`Additional Photo ${index + 1}`}
                    className="thumbnail-image"
                    onClick={() => setSelectedImage(img)}
                  />
                )
            )}
          </div>
        </div>

        {/* Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-description">{formattedDescription}</div>
          <a href={`tel:${product.contactNumber}`} className="contact-button">
            დარეკვა
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged View" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
