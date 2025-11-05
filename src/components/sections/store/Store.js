import React, { useState } from "react";
import StoreProductsList from "./StoreProductsList";
import StoreProductDetail from "./StoreProductDetail";
import StoreCategories from "./StoreCategories";

// Sample product data
const productsData = {
 accessories: [
  {
    id: 1,
    name: "PowerBeats Pro Wireless Earbuds",
    size: "One Size",
    price: "249 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNtv4jWqZYKLi0tRlohnah_Yotql-oWLrUEA&s",
    description: "Wireless earphones for workouts with secure fit",
    features: [
      "Up to 9 hours of listening time",
      "Sweat and water resistant",
      "Adjustable, secure-fit earhooks",
      "Voice control with Siri"
    ],
    expiration: "2028-02-12",
  },
  {
    id: 2,
    name: "Fitbit Charge 6 Fitness Tracker",
    size: "Regular & Large",
    price: "399 dh",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    description: "Advanced fitness tracker with GPS and heart rate monitoring",
    features: [
      "Built-in GPS",
      "24/7 heart rate tracking",
      "7-day battery life",
      "Sleep tracking"
    ],
    expiration: "2028-02-12",
  },
  {
    id: 3,
    name: "Yoga Mat Premium 10mm",
    size: "183cm x 61cm",
    price: "189 dh",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    description: "Non-slip yoga mat for all types of workouts",
    features: [
      "Extra thick 10mm cushioning",
      "Non-slip surface",
      "Eco-friendly materials",
      "Easy to clean"
    ],
    expiration: "N/A",
  },
  {
    id: 4,
    name: "Adjustable Dumbbell Set 20kg",
    size: "20kg max",
    price: "899 dh",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "Space-saving adjustable dumbbell system",
    features: [
      "Quick weight adjustment",
      "Compact design",
      "Durable construction",
      "Comfortable grip"
    ],
    expiration: "N/A",
  },
  {
    id: 5,
    name: "BlenderBottle ProStak System",
    size: "28oz + 2 containers",
    price: "129 dh",
    image: "https://m.media-amazon.com/images/I/71EDgwWW6XL.jpg",
    description: "Complete nutrition mixing system with storage",
    features: [
      "Leak-proof containers",
      "Whisk ball for smooth mixing",
      "Stackable design",
      "BPA-free materials"
    ],
    expiration: "N/A",
  },
  {
    id: 6,
    name: "Resistance Bands Set 5 Levels",
    size: "5 bands set",
    price: "149 dh",
    image: "https://i5.walmartimages.com/seo/Resistance-Bands-Set-Exercise-Bands-Workout-Bands-5-Level-Fitness-Bands-with-4-Resistance-Loops-Handles-As-Seen-On-TV_bdb26afa-6085-465d-8669-18e4d5a400dc.79e3cdd9ceb24249611c57c63148aa24.jpeg",
    description: "Professional resistance bands for full-body training",
    features: [
      "5 resistance levels",
      "Includes handles and anchors",
      "Portable and lightweight",
      "Full workout guide"
    ],
    expiration: "N/A",
  },
  {
    id: 7,
    name: "Ultimate Gym Wrist Wraps et Lifting Straps",
    size: "4-digit combination",
    price: "40 dh",
    image: "https://m.media-amazon.com/images/I/71oxRgSUQaL._AC_SL1500_.jpg",
    description: "Secure combination lock for gym lockers",
    features: [
      "Steel cable for flexibility",
      "4-digit combination",
      "Weather resistant",
      "Easy to set and reset"
    ],
    expiration: "N/A",
  },
  {
    id: 8,
    name: "Wireless Sports Headphones",
    size: "One Size",
    price: "299 dh",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Sweatproof wireless headphones for active lifestyle",
    features: [
      "12-hour battery life",
      "IPX7 waterproof rating",
      "Secure ear hooks",
      "Crystal clear sound"
    ],
    expiration: "2027-11-30",
  }
],
supplements: [
  {
    id: 9,
    name: "Optimum Nutrition Gold Standard Whey",
    size: "2.27kg",
    price: "749 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkSbJ0_5kbMouty2BzyikJy2DVoOVsy2myJA&s",
    description: "Premium whey protein powder for muscle recovery",
    features: [
      "24g of protein per serving",
      "5.5g of BCAAs",
      "Low lactose content",
      "Instantized for easy mixing"
    ],
    expiration: "2028-02-12",
  },
  {
    id: 10,
    name: "MuscleTech NitroTech Whey Protein",
    size: "4lbs",
    price: "899 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShH_5qZT5HyAmAfL5KNwR-aZoBFd2B1B-V3Q&s",
    description: "High-quality whey protein with creatine",
    features: [
      "30g protein per serving",
      "6g of creatine",
      "Enhanced muscle building",
      "Great taste and mixability"
    ],
    expiration: "2028-03-15",
  },
  {
    id: 11,
    name: "Dymatize ISO 100 Hydrolyzed Protein",
    size: "5lbs",
    price: "999 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7nhDPxCA7_yE0a2iOZ35n7_VW-WBU5y9Yg&s",
    description: "Fast-absorbing hydrolyzed whey protein isolate",
    features: [
      "25g of protein per serving",
      "Hydrolyzed for fast absorption",
      "Less than 1g of sugar",
      "Gluten and lactose free"
    ],
    expiration: "2028-04-20",
  },
  {
    id: 12,
    name: "BSN Syntha-6 Protein Powder",
    size: "5.04lbs",
    price: "849 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpZxAuBkYxOK3gJEoFvvjDzpF9q4Q6jNRYuA&s",
    description: "Time-released protein matrix for sustained nutrition",
    features: [
      "22g protein per serving",
      "6-layer protein matrix",
      "10g of essential amino acids",
      "Ultra-premium taste"
    ],
    expiration: "2028-01-30",
  },
  {
    id: 13,
    name: "Cellucor C4 Original Pre-Workout",
    size: "30 servings",
    price: "349 dh",
    image: "https://www.prodietnutrition.ma/1821-large_default/c4-original-30-servings-180g-cellucor.jpg",
    description: "Energy and strength boosting pre-workout formula",
    features: [
      "Increased energy and focus",
      "Enhanced performance",
      "Better muscle pumps",
      "Zero sugar formula"
    ],
    expiration: "2027-12-15",
  },
  {
    id: 14,
    name: "Optimum Nutrition Micronized Creatine",
    size: "300g",
    price: "199 dh",
    image: "https://maghrebnutrition.ma/wp-content/uploads/2025/01/New-Project-43-600x600.jpg",
    description: "Pure creatine monohydrate for strength and power",
    features: [
      "100% pure creatine monohydrate",
      "Micronized for better mixing",
      "Increases strength output",
      "Supports muscle growth"
    ],
    expiration: "2028-05-01",
  },
  {
    id: 15,
    name: "MuscleTech Mass-Tech Extreme 2000",
    size: "7lbs",
    price: "1199 dh",
    image: "https://contents.mediadecathlon.com/p1971936/k$0f7bd9044d88df8d473638a1bb31528f/masstech-2000-vanille.jpg?format=auto&quality=40&f=800x800",
    description: "Advanced mass gainer for hardgainers",
    features: [
      "80g protein per serving",
      "2350 calories per serving",
      "5g creatine monohydrate",
      "21 vitamins and minerals"
    ],
    expiration: "2028-02-12",
  },
  {
    id: 16,
    name: "Ghost BCAA Amino Acids",
    size: "30 servings",
    price: "279 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGnKt2FoI3tuyrD6_O9OQLhY-lEA4KkS64A&s",
    description: "Branch chain amino acids for muscle recovery",
    features: [
      "4:1:1 ratio of BCAA",
      "Zero sugar formula",
      "Great flavors",
      "Supports muscle recovery"
    ],
    expiration: "2028-03-10",
  }
],
clothing: [
  {
    id: 17,
    name: "Nike Dri-FIT Training Top",
    size: "S, M, L, XL",
    price: "299 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_lLh82N8eyTr-9-8gv8HQmb2MfX-cW92uA&s",
    description: "Moisture-wicking training shirt for maximum comfort",
    features: [
      "Dri-FIT technology",
      "Breathable fabric",
      "Comfortable fit",
      "Durable construction"
    ],
    expiration: "N/A",
  },
  {
    id: 18,
    name: "Adidas Training Joggers",
    size: "S, M, L, XL",
    price: "349 dh",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/006512403?fmt=auto&$background-off-white$",
    description: "Performance joggers for training and casual wear",
    features: [
      "Stretchable fabric",
      "Moisture-wicking",
      "Elastic waistband",
      "Multiple pockets"
    ],
    expiration: "N/A",
  },
  {
    id: 19,
    name: "Under Armour Tech Shorts",
    size: "S, M, L, XL",
    price: "229 dh",
    image: "https://i5.walmartimages.com/seo/Under-Armour-Men-s-UA-Tech-Graphic-Pocketed-Shorts-1306443-001-Black_bf5c3b11-c4e9-421e-857f-234e49f61cfc.388597db72aed17b137297f764fd98ba.jpeg",
    description: "Lightweight training shorts with built-in liner",
    features: [
      "UA Tech fabric",
      "Built-in compression liner",
      "Quick-drying material",
      "Anti-odor technology"
    ],
    expiration: "N/A",
  },
  {
    id: 20,
    name: "Gymshark Vital Seamless 2.0",
    size: "XS, S, M, L, XL",
    price: "399 dh",
    image: "https://cdn.shopify.com/s/files/1/0098/8822/files/images-VitalSeamless2_0LeggingsBlackMarlB1A2B_BBF3_0766_V1b.jpg?v=1761682059",
    description: "Seamless training set for ultimate flexibility",
    features: [
      "Seamless construction",
      "Four-way stretch",
      "Breathable fabric",
      "Modern design"
    ],
    expiration: "N/A",
  },
  {
    id: 21,
    name: "Reebok CrossFit Nano Shoes",
    size: "40-46 EU",
    price: "699 dh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcC1oagLz28zTV3Xwr7ge9AN9IyMJ8nZBtFw&s",
    description: "Training shoes for CrossFit and weightlifting",
    features: [
      "Stable platform for lifting",
      "Flexible forefoot",
      "Durable construction",
      "Excellent grip"
    ],
    expiration: "N/A",
  },
  {
    id: 22,
    name: "Lululemon ABC Pants",
    size: "28-38 waist",
    price: "899 dh",
    image: "https://images.lululemon.com/is/image/lululemon/LM5957S_0001_1",
    description: "Anti-ball crushing pants for all-day comfort",
    features: [
      "Warmer cotton feel",
      "Four-way stretch",
      "Multiple pockets",
      "Durable water repellent"
    ],
    expiration: "N/A",
  },
  {
    id: 23,
    name: "Nike Pro Compression Top",
    size: "S, M, L, XL",
    price: "249 dh",
    image: "https://images-eu.ssl-images-amazon.com/images/I/71JMPwdWnNL._AC_UL600_SR600,600_.jpg",
    description: "Compression top for muscle support and recovery",
    features: [
      "Compression fit",
      "Moisture-wicking",
      "Breathable fabric",
      "Flatlock seams"
    ],
    expiration: "N/A",
  },
  {
    id: 24,
    name: "Adidas Ultraboost Running Shoes",
    size: "39-45 EU",
    price: "1199 dh",
    image: "https://assets.adidas.com/images/w_450,f_auto,q_auto/dc894d3d10fa47ac9f3d161eda8eb073_9366/JQ0823_00_plp_standard.jpg",
    description: "Premium running shoes with Boost technology",
    features: [
      "Boost midsole for energy return",
      "Primeknit upper",
      "Continental rubber outsole",
      "Adaptive fit"
    ],
    expiration: "N/A",
  }
],
};

// ...existing code...

// StoreSection component for use as a section in the main app
export default function Store({ goToShop, fullPage }) {
  const [currentView, setCurrentView] = useState("store-home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // On homepage, only show intro and button
  if (!fullPage) {
    return (
      <div id="store-section" className="min-h-screen bg-black">
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-white text-6xl font-bold text-center mb-6">
              GYM.STORE
            </h1>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              Gym Store offers quality gym gear, supplements, and stylish
              sportswear to support your training. Get straps, creatine, and
              more to train strong and look great.
            </p>
            <div className="text-center">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-12 py-3 rounded transition"
                onClick={goToShop}
              >
                Go to Shop ...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // On /shop page, show full store experience
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentView("products");
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentView("product-detail");
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView("products");
  };

  const handleBackToStore = () => {
    setSelectedCategory(null);
    setSelectedProduct(null);
    setCurrentView("store-home");
  };

  // StoreCategories for /shop
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

  return (
    <div id="store-section" className="min-h-screen bg-black">
      {currentView === "store-home" && (
        <StoreCategories onCategorySelect={handleCategorySelect} />
      )}
      {currentView === "products" && (
        <StoreProductsList
          products={productsData[selectedCategory] || []}
          categoryTitles={{
            accessories: "Gym Accessories",
            supplements: "Supplements & Nutrition",
            clothing: "Gym Clothes & Wear",
          }}
          category={selectedCategory}
          onProductSelect={handleProductSelect}
          onBack={handleBackToStore}
        />
      )}
      {currentView === "product-detail" && (
        <StoreProductDetail
          product={selectedProduct}
          category={selectedCategory}
          categoryTitles={{
            accessories: "Gym Accessories",
            supplements: "Supplements & Nutrition",
            clothing: "Gym Clothes & Wear",
          }}
          onBack={handleBackToProducts}
        />
      )}
    </div>
  );
}
