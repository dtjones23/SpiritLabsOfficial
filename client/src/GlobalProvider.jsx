import React, { useState, useEffect, createContext, useContext } from 'react';
import Auth from './utils/auth';
import { useQuery } from '@apollo/client';
import { GET_USER } from './utils/queries';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
  const [username, setUsername] = useState(loggedIn ? Auth.getProfile().data.username : "");
  const [userId, setUserId] = useState(loggedIn ? Auth.getProfile().data._id : "");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []  // Load favorites from local storage on initial load
  );

  // Fetch the user's favorite cocktail IDs
  const { data } = useQuery(GET_USER, {
    variables: { userId },
    skip: !loggedIn,
  });

  useEffect(() => {
    if (data?.getUser) {
      const userFavorites = data.getUser.map((fav) => fav.id);
      setFavorites(userFavorites);
      localStorage.setItem('favorites', JSON.stringify(userFavorites));  // Update local storage when favorites change
    }
  }, [data]);

  const login = (token) => {
    Auth.login(token);
    setLoggedIn(true);
  };

  const logout = () => {
    Auth.logout();
    setLoggedIn(false);
    setFavorites([]);
    localStorage.removeItem('favorites');  // Clear favorites from local storage on logout
  };

  const toggleFavorite = (cocktailId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(cocktailId)
        ? prevFavorites.filter((id) => id !== cocktailId)
        : [...prevFavorites, cocktailId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <GlobalContext.Provider value={{ loggedIn, username, login, logout, favorites, toggleFavorite, userId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
