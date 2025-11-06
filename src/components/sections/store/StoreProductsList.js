// StoreProductsList.js
import React from "react";

const StoreProductsList = ({
  products,
  categoryTitles,
  category,
  onProductSelect,
  onBack,
}) => (
  <div className="min-h-screen bg-black py-12 px-8">
    <div className="max-w-7xl mt-10 mx-auto">
      <h1 className="text-white text-5xl font-bold text-center mb-8">
        {categoryTitles[category]}
      </h1>
      <div className="text-gray-400 text-sm mb-12">
        <button onClick={onBack} className="hover:text-red-600">
          GYM.STORE
        </button>
        <span className="mx-2">{">"}</span>
        <span>{categoryTitles[category]}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductSelect(product)}
            className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow group"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded font-bold">
                {product.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-black font-semibold mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm">{product.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StoreProductsList;
