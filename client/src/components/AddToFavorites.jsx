import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_FAVORITES } from '../utils/mutations';
import { useGlobalContext } from '../GlobalProvider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const AddToFavorites = ({ cocktailId }) => {
  const { favorites, toggleFavorite } = useGlobalContext();
  const [favoriteCocktail] = useMutation(ADD_TO_FAVORITES);
  const { userId } = useGlobalContext();

  const isFavorite = favorites.includes(cocktailId);

  const handleFavoriteClick = async (event) => {
    event.stopPropagation(); 
    try {
      await favoriteCocktail({ variables: { userId, cocktailId } });
      toggleFavorite(cocktailId); // Update global state
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div onClick={handleFavoriteClick} className="cursor-pointer hover:scale-155">
      {isFavorite ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'white' }} />}
    </div>
  );
};

export default AddToFavorites;
