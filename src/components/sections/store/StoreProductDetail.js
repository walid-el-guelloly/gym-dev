// StoreProductDetail.js
import React, { useState } from "react";

const StoreProductDetail = ({ product, onBack, category, categoryTitles }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-black py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-5xl font-bold text-center mb-8">
          {categoryTitles[category]}
        </h1>
        <div className="text-gray-400 text-sm mb-12">
          <button onClick={onBack} className="hover:text-red-600">
            GYM.STORE
          </button>
          <span className="mx-2">{">"}</span>
          <button onClick={onBack} className="hover:text-red-600">
            {categoryTitles[category]}
          </button>
          <span className="mx-2">{">"}</span>
          <span>{product.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-96 object-contain"
            />
          </div>
          {/* Product Info */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">{product.name}</h2>
            <div className="space-y-3 mb-8">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-red-600 mr-3">•</span>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
            <div className="text-4xl font-bold mb-4">
              {product.price}{" "}
              <span className="text-2xl text-gray-400">TTC</span>
            </div>
            {product.expiration !== "N/A" && (
              <p className="text-gray-400 mb-8">
                Date d'expiration {product.expiration}
              </p>
            )}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 text-xl font-bold"
              >
                -
              </button>
              <span className="w-12 h-10 bg-red-600 text-white rounded flex items-center justify-center font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 text-xl font-bold"
              >
                +
              </button>
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg text-lg transition">
              Ajouter aux panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductDetail;
