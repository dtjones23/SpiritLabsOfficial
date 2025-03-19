import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COCKTAILS } from '../utils/queries';
import { useGlobalContext } from '../GlobalProvider';
import AddToFavorites from '../components/AddToFavorites';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const liquorOptions = ["Show All", "Whiskey", "Vodka", "Tequila", "Rum", "Gin", "Brandy", "Mezcal", "Bourbon"
  ];
  const [selectedLiquor, setSelectedLiquor] = useState("Show All");
  const { data, loading, error } = useQuery(GET_COCKTAILS);
  const { loggedIn } = useGlobalContext();
    const navigate = useNavigate();

  if (loading) return <p>Loading cocktails...</p>;
  if (error) return <p>Error loading cocktails.</p>;

const filteredCocktails = data?.getCocktails.filter((cocktail) => {
    if (selectedLiquor === "Show All") return true;
    return cocktail.ingredients.alcohol.some(alcohol => 
        alcohol.name.toLowerCase().includes(selectedLiquor.toLowerCase())
    );
});

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Cocktails</h1>
      <div className="mb-4">
        {liquorOptions.map((liquor) => (
          <button
            key={liquor}
            className={`px-4 py-2 m-2 rounded cursor-pointer ${selectedLiquor === liquor ? 'bg-gray-900 border border-black text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedLiquor(liquor)}
          >
            {liquor}
          </button>
        ))}
      </div>
      <div className="overflow-y-auto p-3 max-h-[80vh]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCocktails.map((cocktail) => (
          <button key={cocktail.id} className="border rounded-lg p-4 shadow-md relative bg-yellow-500 hover:scale-105 cursor-pointer" onClick={() => navigate(`/description/${cocktail.id}`)}>
            <img src={cocktail.image} alt={cocktail.name} className="w-full h-40 object-cover rounded-md" />
            <div className='flex items-center justify-between'>
            <h2 className="text-lg font-semibold mt-2">{cocktail.name}</h2>
            {loggedIn && <AddToFavorites cocktailId={cocktail.id} />}
            </div>
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
