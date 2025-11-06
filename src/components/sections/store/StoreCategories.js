// StoreCategories.js
import React from "react";

const StoreCategories = ({ onCategorySelect }) => (
  <div className="min-h-screen bg-gradient-to-b from-black-900 to-black py-16 px-8">
    <div className="max-w-6xl mt-24 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Gym Accessories Card */}
        <div
          onClick={() => onCategorySelect("accessories")}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
            alt="Gym Accessories"
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-all group-hover:bg-opacity-50">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-white text-2xl font-bold">Gym Accessories</h3>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition">
                <span className="text-white text-xl">→</span>
              </div>
            </div>
          </div>
        </div>
        {/* Supplements Card */}
        <div
          onClick={() => onCategorySelect("supplements")}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600"
            alt="Supplements"
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-all group-hover:bg-opacity-50">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-white text-2xl font-bold">
                Supplements & Nutrition
              </h3>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition">
                <span className="text-white text-xl">→</span>
              </div>
            </div>
          </div>
        </div>
        {/* Clothing Card */}
        <div
          onClick={() => onCategorySelect("clothing")}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
            alt="Gym Clothing"
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-all group-hover:bg-opacity-50">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-white text-2xl font-bold">
                Gym Clothes & Wear
              </h3>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition">
                <span className="text-white text-xl">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StoreCategories;
