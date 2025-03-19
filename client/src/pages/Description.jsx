import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COCKTAIL } from '../utils/queries';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddToFavorites from '../components/AddToFavorites';
import { useGlobalContext } from '../GlobalProvider';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function Description() {
    const { loggedIn } = useGlobalContext();
    const navigate = useNavigate();
  const { id } = useParams(); // Get the cocktail ID from the URL
  const { loading, error, data } = useQuery(GET_COCKTAIL, {
    variables: { id }, // Fetch the cocktail with the id
  });

  const [activeTab, setActiveTab] = useState('ingredients');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cocktail = data.getCocktail;

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

return (
    <div className="min-h-screen flex flex-col items-center">
    <IconButton
        onClick={() => navigate(-1)}
        sx={{
            fontSize: "2rem",
            transition: "0.3s",
            "&:hover": { color: "primary.main" },
        }}
        className="mb-4"
    >
        <ArrowBackIcon sx={{ fontSize: "2.0rem" }} />
        GO BACK
    </IconButton>
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex w-4/4">
        {/* Left side: Cocktail name and image */}
        <div className="w-1/2 pr-4">
            <div className='flex justify-between'>
            <h2 className="text-4xl font-semibold mb-4 text-white">{cocktail.name}</h2>
            {loggedIn && <AddToFavorites cocktailId={cocktail.id} />}
            </div>
            <img
                src={cocktail.image}
                // alt={cocktail.name}
                className="w-full h-auto border rounded-lg shadow-md"
            />
        </div>

        {/* Right side: Tabs and content */}
        <div className="w-1/2 pl-4">
            {/* Tabs */}
            <div className="flex mb-4">
                <button
                    onClick={() => handleTabChange('ingredients')}
                    className={`flex-1 py-3 border px-4 text-xl text-center font-medium rounded-tl-lg transition-colors cursor-pointer ${
                        activeTab === 'ingredients' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300'
                    }`}
                >
                    Ingredients
                </button>
                <button
                    onClick={() => handleTabChange('instructions')}
                    className={`flex-1 py-3 border px-4 text-xl text-center font-medium rounded-tr-lg transition-colors cursor-pointer ${
                        activeTab === 'instructions' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300'
                    }`}
                >
                    Instructions
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'ingredients' && (
                <div>
                    <h4 className="text-3xl font-medium text-white mb-3">Alcohol:</h4>
                    <ul className="text-white">
                        {cocktail.ingredients.alcohol.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-xl my-2">
                                <span>{item.name}</span>
                                <span className="border-b border-gray-600 flex-grow mx-3"></span>
                                <span>{item.amount}</span>
                            </li>
                        ))}
                        <h4 className="text-3xl font-medium text-white my-5">Mixers:</h4>
                        {cocktail.ingredients.mixers.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-xl my-2">
                                <span>{item.name}</span>
                                <span className="border-b border-gray-600 flex-grow mx-3"></span>
                                <span>{item.amount}</span>
                            </li>
                        ))}
                        <h4 className="text-3xl font-medium text-white my-5">Garnishes:</h4>
                        {cocktail.ingredients.garnishes.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-xl my-2">
                                <span>{item.name}</span>
                                <span className="border-b border-gray-600 flex-grow mx-3"></span>
                                <span>{item.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === 'instructions' && (
                <div>
                    <h3 className="text-2xl font-medium text-white mb-2">Instructions:</h3>
                    <p className="text-white text-xl">{cocktail.assembly}</p>
                </div>
            )}
        </div>
    </div>
</div>
);
}
