import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalProvider";
import { useQuery } from '@apollo/client';
import { GET_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import AddToFavorites from "../components/AddToFavorites";
import AuthModal from "../components/AuthModal";

export default function Profile() {
  const { loggedIn, username, favorites, userId, logout } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  // Fetch the user data using the GET_USER query
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !loggedIn,
  });

  // Display a loading state while fetching data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Display the user's favorite drinks
  const favoriteDrinks = data?.getUser?.favorites || [];

  // Filter favorites based on the search term
  const filteredFavorites = favoriteDrinks.filter((drink) =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-3 h-full">
      {/* Logout Button */}
      {loggedIn && (
        <div className="w-full flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Profile Icon */}
      <img
        src="/icon-light.svg"
        alt="logo-image"
        className="w-1/10 mb-2"
      />

      {/* Search Bar */}
      {loggedIn ? (
        <input
          type="text"
          placeholder="Search your favorite cocktails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg p-3 border rounded-lg text-center mb-6"
        />
      ) : (
        <> 
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setAuthOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
          >
            Log In / Sign Up
          </button>
        </div>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        <p className="text-gray-500 text-center mb-6">
          Sign up or login to save your favorite cocktails.
        </p>
        </>
      )}

      {/* Favorites List */}
      {loggedIn ? (
        <div className="mt-2 w-full max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">My Favorite Cocktails</h2>
          <div className="h-[55vh] overflow-auto p-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {filteredFavorites.length > 0 ? (
                filteredFavorites.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => navigate(`/description/${drink.id}`)}
                    className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center transition-transform transform hover:scale-105 border cursor-pointer"
                  >
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-24 h-24 rounded-lg mb-2"
                    />
                    <p className="text-lg font-medium">{drink.name}</p>
                    <AddToFavorites cocktailId={drink.id} />
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No favorites found.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
      
    </div>
  );
}
