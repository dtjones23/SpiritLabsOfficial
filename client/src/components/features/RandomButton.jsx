import { useState } from "react";

const randomCocktails = [
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
];

export default function RandomButton() {
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const getRandomCocktail = () => {
    const randomIndex = Math.floor(Math.random() * randomCocktails.length);
    setSelectedCocktail(randomCocktails[randomIndex]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
      <div className="flex flex-col items-center">
        <button
          onClick={getRandomCocktail}
          className="w-full text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Click For A Random Cocktail
          </h2>
          <img src="/icon-dark.svg" alt="logo-image" className="mx-auto w-40" />
        </button>

        {selectedCocktail && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 transition-opacity duration-300 ease-in-out">
            <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-xl shadow-2xl w-96 text-center relative transform transition-transform duration-300 ease-in-out scale-95">
              <button
                onClick={() => setSelectedCocktail(null)}
                className="absolute p-2 top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                ✖
              </button>

              {/* Cocktail Details */}
              <h2 className="text-2xl font-semibold">
                {selectedCocktail.name}
              </h2>
              <img
                src={selectedCocktail.image}
                alt={selectedCocktail.name}
                className="w-full h-48 object-cover rounded-lg mt-4 shadow-md"
              />
              <h3 className="mt-4 font-medium">Ingredients:</h3>
              <ul className="text-gray-600">
                {selectedCocktail.ingredients.map((ingredient, idx) => (
                  <li key={idx}>• {ingredient}</li>
                ))}
              </ul>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer mr-2"
                onClick={getRandomCocktail}
              >
                Try Again?
              </button>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer ml-2">
                View Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
