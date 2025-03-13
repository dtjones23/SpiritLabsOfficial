import React from 'react'
const fakeDrinkOfTheDay = {
    name: "Singapore Sling",
    description: "A fruity and refreshing gin-based cocktail.",
    image: "https://www.thecocktaildb.com/images/media/drink/lyloe91487602877.jpg",
    rating: 4.9
  };

export default function DOTD() {
return (
    <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h2 className="text-4xl font-semibold mb-4 text-white">Drink Of The Day</h2>
        <div className='flex items-center justify-center'>
            <h3 className="text-2xl font-medium text-white mr-2">{fakeDrinkOfTheDay.name}</h3>
            {fakeDrinkOfTheDay.rating && <h2 className="text-gray-300">⭐ {fakeDrinkOfTheDay.rating}</h2>}
        </div>
        <img
            src={fakeDrinkOfTheDay.image}
            alt="drink-of-the-day"
            className="mx-auto w-4/5 border rounded-lg"
        />
        <button className="w-4/5 py-5">
            <h3 className="text-2xl font-medium text-gray-800 bg-gray-100 rounded-full shadow hover:bg-gray-300 cursor-pointer">View Recipe</h3>
        </button>
        <h2 className='text-white font-semibold mt-5 text-xl'>* Gotta be of the legal drinking age to be here pal.. them's the rules*</h2>
    </div>
)
}
