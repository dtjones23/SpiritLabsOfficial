import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalProvider";
import { useQuery } from '@apollo/client';
import { GET_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import AddToFavorites from "../components/AddToFavorites";
import AuthModal from "../components/AuthModal";

export default function Profile() {
  const { loggedIn, username, userId, logout } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !loggedIn || !userId,
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (loggedIn && userId) {
      refetch();
    }
  }, [loggedIn, userId, refetch]);

  const favoriteDrinks = data?.getUser?.favorites || [];

  const filteredFavorites = favoriteDrinks.filter(drink =>
    drink.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error loading profile</div>;

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {loggedIn && (
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      )}

      <img
        src="/icon-light.svg"
        alt="Profile icon"
        className="w-20 h-20 mb-6"
      />

      {loggedIn ? (
        <>
          <input
            type="text"
            placeholder="Search your favorite cocktails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg p-3 border rounded-lg text-center mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="w-full max-w-5xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {username}'s Favorite Cocktails
            </h2>
            
            <div className="h-[55vh] overflow-y-auto p-3">
              {filteredFavorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFavorites.map((drink) => (
                    <div
                      key={drink.id}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105 cursor-pointer border"
                      onClick={() => navigate(`/description/${drink.id}`)}
                    >
                      <img
                        src={drink.image}
                        alt={drink.name}
                        className="w-24 h-24 rounded-lg mb-3 object-cover"
                      />
                      <p className="text-lg font-medium text-center mb-2">{drink.name}</p>
                      <AddToFavorites cocktailId={drink.id} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  {debouncedSearchTerm ? (
                    <p className="text-gray-500">No matching favorites found</p>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-4">You haven't saved any favorites yet</p>
                      <button
                        onClick={() => navigate('/explore')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer hover:scale-105"
                      >
                        Explore Cocktails
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center mb-6">
            <button 
              onClick={() => setAuthOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Log In / Sign Up
            </button>
            <p className="text-gray-500 mt-4 text-center max-w-md">
              Sign up or login to save your favorite cocktails.
            </p>
          </div>
          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
      )}
    </div>
  );
}