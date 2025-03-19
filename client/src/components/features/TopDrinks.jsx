import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { GET_COCKTAILS } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function TopDrinks() {
  const { data, loading, error } = useQuery(GET_COCKTAILS);
  const [topCocktails, setTopCocktails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Update topCocktails when data is fetched
  useEffect(() => {
    if (data && data.getCocktails) {
      const sorted = data.getCocktails
        .slice()
        .sort((a, b) => b.favoritesCount - a.favoritesCount)
        .slice(0, 10);
      setTopCocktails(sorted);
    }
  }, [data]);

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

  if (loading) return <p className="text-black">Loading...</p>;
  if (error) return <p className="text-black">Error: {error.message}</p>;

  if (topCocktails.length === 0) return <p className="text-black">No cocktails available.</p>;

  const currentCocktail = topCocktails[currentIndex];
  // const { alcohol = [], mixers = [], garnishes = [] } = currentCocktail.ingredients || {};

  return (
    <div className="relative bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-4 text-white">Most Favorited Drinks  <FavoriteIcon style={{ color: 'red' }} /></h2>

      {/* Arrows for navigation */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow hover:bg-yellow-500 hover:scale-115 cursor-pointer"
      >
        <ArrowBackIosIcon size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow hover:bg-yellow-500 hover:scale-115 cursor-pointer"
      >
        <ArrowForwardIosIcon size={20} />
      </button>

      {/* Display selected cocktail */}
      <img
        src={currentCocktail.image}
        alt={currentCocktail.name}
        className="w-48 h-48 object-cover rounded-lg"
      />

     { /* Drink Details */}
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white">{currentCocktail.name}</h2>
        <div className="text-gray-400 mt-2">
          <ul>
            {/* {alcohol.slice(0, 1).map((item, index) => (
              <li key={`alcohol-${index}`}>{item.name}</li>
            ))}
            {alcohol.length > 1 && <li>and more...</li>} */}
            {/* {mixers.slice(0, 2).map((item, index) => (
              <li key={`mixer-${index}`}>{item.name}</li>
            ))}
            {mixers.length > 2 && <li>and more...</li>} */}
          </ul>
          <button 
          className="text-yellow-400 font-semibold cursor-pointer hover:scale-120"
          onClick={() => navigate(`/description/${currentCocktail.id}`)}
          >
            <span>View Recipe</span>
          </button>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex mt-4 space-x-2">
        {topCocktails.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-yellow-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}