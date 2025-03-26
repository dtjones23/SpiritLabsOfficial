import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COCKTAIL } from '../utils/queries';
import { useParams } from 'react-router-dom';
import AddToFavorites from '../components/AddToFavorites';
import { useGlobalContext } from '../GlobalProvider';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function Description() {
  const { loggedIn } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_COCKTAIL, {
    variables: { getCocktailId: id },
    fetchPolicy: "cache-and-network"
  });

  const [activeTab, setActiveTab] = useState('ingredients');

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;

  const cocktail = data?.getCocktail;
  if (!cocktail) return <div className="min-h-screen flex items-center justify-center">Cocktail not found</div>;

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          fontSize: "2rem",
          transition: "0.3s",
          "&:hover": { color: "primary.main" },
        }}
        className="self-start mb-4"
      >
        <ArrowBackIcon sx={{ fontSize: "2.0rem" }} />
        GO BACK
      </IconButton>
      
      <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col lg:flex-row w-full max-w-6xl">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-4 mb-6 lg:mb-0">
          <div className='flex justify-between items-center'>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">{cocktail.name}</h2>
            {loggedIn && <AddToFavorites cocktailId={cocktail.id} />}
          </div>
          <img
            src={cocktail.image}
            alt={cocktail.name}
            className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md mt-4"
          />
        </div>

        <div className="w-full lg:w-1/2 pl-0 lg:pl-4">
          <div className="flex mb-4">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-3 px-4 text-lg md:text-xl text-center font-medium rounded-tl-lg transition-colors ${
                activeTab === 'ingredients' 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-3 px-4 text-lg md:text-xl text-center font-medium rounded-tr-lg transition-colors ${
                activeTab === 'instructions' 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Instructions
            </button>
          </div>

          {activeTab === 'ingredients' && (
            <div className="text-white">
              <h4 className="text-2xl md:text-3xl font-medium mb-3">Alcohol:</h4>
              <ul className="space-y-2">
                {cocktail.ingredients.alcohol.map((item, index) => (
                  <li key={`alcohol-${index}`} className="flex justify-between items-center text-lg md:text-xl">
                    <span>{item.name}</span>
                    <span className="border-b border-gray-600 flex-grow mx-3"></span>
                    <span>{item.amount}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-2xl md:text-3xl font-medium mt-6 mb-3">Mixers:</h4>
              <ul className="space-y-2">
                {cocktail.ingredients.mixers.map((item, index) => (
                  <li key={`mixer-${index}`} className="flex justify-between items-center text-lg md:text-xl">
                    <span>{item.name}</span>
                    <span className="border-b border-gray-600 flex-grow mx-3"></span>
                    <span>{item.amount}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-2xl md:text-3xl font-medium mt-6 mb-3">Garnishes:</h4>
              <ul className="space-y-2">
                {cocktail.ingredients.garnishes.map((item, index) => (
                  <li key={`garnish-${index}`} className="flex justify-between items-center text-lg md:text-xl">
                    <span>{item.name}</span>
                    <span className="border-b border-gray-600 flex-grow mx-3"></span>
                    <span>{item.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="text-white">
              <h3 className="text-2xl font-medium mb-3">Instructions:</h3>
              <p className="text-lg md:text-xl whitespace-pre-line">{cocktail.assembly}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}