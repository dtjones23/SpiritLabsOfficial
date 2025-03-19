import React, { useEffect, useState } from 'react';
import { GET_RANDOM_COCKTAIL } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function DOTD() {
  const { loading, error, data } = useQuery(GET_RANDOM_COCKTAIL);
  const [cocktail, setCocktail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a saved drink in localStorage
    const savedCocktail = localStorage.getItem('cocktail');
    const savedTimestamp = localStorage.getItem('cocktailTimestamp');
    const currentTime = new Date().getTime();

    // If a saved drink exists and it's been less than 24 hours, use it
    if (savedCocktail && savedTimestamp && currentTime - savedTimestamp < 86400000) {
      setCocktail(JSON.parse(savedCocktail));
    } else {
      // Otherwise, use the fetched data and save it for 24 hours
      if (data && data.getRandomCocktail) {
        const fetchedCocktail = data.getRandomCocktail;
        setCocktail(fetchedCocktail);
        localStorage.setItem('cocktail', JSON.stringify(fetchedCocktail));
        localStorage.setItem('cocktailTimestamp', currentTime.toString());
      }
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!cocktail) return null;

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow">
      <h2 className="text-4xl font-semibold mb-4 text-white">Drink Of The Day</h2>
      <h2 className="text-2xl font-medium text-white mb-1">{cocktail.name}</h2>
      <img src={cocktail.image} alt={cocktail.name} className="mb-2 mx-auto w-4/5 border rounded-lg" />
      <button className="w-4/5 py-5" onClick={() => navigate(`/description/${cocktail.id}`)}  >
        <h3 className="text-2xl font-medium text-gray-800 bg-gray-100 rounded-full shadow hover:bg-yellow-500 cursor-pointer">View Recipe</h3>
      </button>
      <h2 className='text-white font-semibold mt-5 text-xl'>* Gotta be of the legal drinking age to be here pal.. them's the rules*</h2>
    </div>
  );
}
