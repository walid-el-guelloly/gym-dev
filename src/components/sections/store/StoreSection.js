import React from "react";

const StoreSection = ({ onGoToShop }) => (
  <section id="store-section" className="bg-black py-16">
    <h2 className="text-white text-5xl font-bold text-center mb-8 mt-16">
      GYM.STORE
    </h2>
    <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
      Gym Store offers quality gym gear, supplements, and stylish sportswear to
      support your training. Get straps, creatine, and more to train strong and
      look great.
    </p>
    <div className="min-h-[60vh] bg-gray-to-b from-black-900 to-gray py-16 px-8">
      <div className="max-w-6xl mt-18 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Gym Accessories Card */}
          <div className="relative group overflow-hidden rounded-lg cursor-default">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
              alt="Gym Accessories"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-end p-6 transition-all">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-white text-2xl font-bold">
                  Gym Accessories
                </h3>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition">
                  <span className="text-white text-xl">→</span>
                </div>
              </div>
            </div>
          </div>
          {/* Supplements Card */}
          <div className="relative group overflow-hidden rounded-lg cursor-default">
            <img
              src="https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600"
              alt="Supplements"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-end p-6 transition-all">
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
          <div className="relative group overflow-hidden rounded-lg cursor-default">
            <img
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
              alt="Gym Clothing"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-end p-6 transition-all">
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
        <div className="text-center mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-12 py-3 rounded transition text-lg"
            onClick={onGoToShop}
          >
            Go to Shop
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default StoreSection;
