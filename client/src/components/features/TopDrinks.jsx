import React, { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const topCocktails = [
  {
    id: 1,
    name: "Margarita",
    image:
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    ingredients: ["Tequila", "Triple Sec", "Lime Juice", "Salt"],
  },
  {
    id: 2,
    name: "Old Fashioned",
    image:
      "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    ingredients: ["Bourbon", "Angostura Bitters", "Sugar", "Water"],
  },
  {
    id: 3,
    name: "Mojito",
    image:
      "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
    ingredients: ["White Rum", "Lime", "Sugar", "Mint", "Soda Water"],
  },
  {
    id: 4,
    name: "Cosmopolitan",
    image:
      "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
    ingredients: ["Vodka", "Triple Sec", "Cranberry Juice", "Lime Juice"],
  }
];

export default function TopDrinks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topCocktails.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === topCocktails.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">Most Favorited Drinks</h2>
      {/* Arrows for navigation */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 cursor-pointer"
      >
        <ArrowBackIosIcon size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 cursor-pointer"
      >
        <ArrowForwardIosIcon size={20} />
      </button>

      <img
        src={topCocktails[currentIndex].image}
        alt={topCocktails[currentIndex].name}
        className="w-48 h-48 object-cover rounded-lg"
      />

      {/* Drink Details */}
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white">{topCocktails[currentIndex].name}</h2>
        <p className="text-gray-400 mt-2">
          {topCocktails[currentIndex].ingredients.join(", ")}
        </p>
      </div>

      {/* Indicator Dots */}
      <div className="flex mt-4 space-x-2">
        {topCocktails.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-gray-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
