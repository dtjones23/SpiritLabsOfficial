import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const fakeFavorites = [
  { id: 1, name: "Margarita", image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" },
  { id: 2, name: "Old Fashioned", image: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg" },
  { id: 3, name: "Mojito", image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg" },
  { id: 4, name: "Cosmopolitan", image: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg" },
  { id: 5, name: "Whiskey Sour", image: "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg" },
  { id: 6, name: "Negroni", image: "https://www.thecocktaildb.com/images/media/drink/0bkwca1612795829.jpg" },
  { id: 7, name: "Martini", image: "https://www.thecocktaildb.com/images/media/drink/71t8581603821687.jpg" },
  { id: 8, name: "Pina Colada", image: "https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg" },
  { id: 9, name: "Daiquiri", image: "https://www.thecocktaildb.com/images/media/drink/mr30ob1582479875.jpg" },
  { id: 10, name: "Mai Tai", image: "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg" },
  { id: 11, name: "Bloody Mary", image: "https://www.thecocktaildb.com/images/media/drink/t6caa21582485702.jpg" },
  { id: 12, name: "Gin and Tonic", image: "https://www.thecocktaildb.com/images/media/drink/uwryxx1483387873.jpg" },
  { id: 13, name: "Moscow Mule", image: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg" },
  { id: 14, name: "Screwdriver", image: "https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg" },
  { id: 15, name: "Tequila Sunrise", image: "https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg" },
  { id: 16, name: "White Russian", image: "https://www.thecocktaildb.com/images/media/drink/vsrupw1472405732.jpg" },
  { id: 17, name: "Long Island Iced Tea", image: "https://www.thecocktaildb.com/images/media/drink/tppn6i1589574695.jpg" },
  { id: 18, name: "Mint Julep", image: "https://www.thecocktaildb.com/images/media/drink/sqxsxp1478820236.jpg" },
  { id: 19, name: "Pisco Sour", image: "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg" },
  { id: 20, name: "Singapore Sling", image: "https://www.thecocktaildb.com/images/media/drink/lyloe91487602877.jpg" },
];

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = fakeFavorites.filter((drink) =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-6">
      {/* Profile Icon */}
      <img
        src="/icon-light.svg"
        alt="logo-image"
        className="w-1/10 mb-1"
      />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search your favorite cocktails..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-lg p-3 border rounded-lg text-center"
      />

      {/* Favorites List */}
      <div className="mt-6 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Favorite Cocktails</h2>
        <div className="h-150 overflow-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map((drink) => (
                <div
                  key={drink.id}
                  className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center transition-transform transform hover:scale-105 border"
                >
                  <img src={drink.image} alt={drink.name} className="w-24 h-24 rounded-lg mb-2" />
                  <p className="text-lg font-medium">{drink.name}</p>
                  <FavoriteBorderOutlinedIcon className="text-red-500 text-2xl mt-2" />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No favorites found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}