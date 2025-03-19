import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_COCKTAILS } from "../utils/queries";
import AddToFavorites from "../components/AddToFavorites";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../GlobalProvider";

export default function Results() {
    const { loggedIn } = useGlobalContext();
  const location = useLocation();
  const { selectedAlcohol = [], selectedMixers = [] } = location.state || {};
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_COCKTAILS);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMatches, setModalMatches] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter and sort cocktails based on selected alcohol and mixers
  const filteredCocktails = data.getCocktails
    .map((drink) => {
      const alcoholMatches = drink.ingredients.alcohol.filter((ingredient) =>
        selectedAlcohol.includes(ingredient.name)
      );
      const mixerMatches = drink.ingredients.mixers.filter((ingredient) =>
        selectedMixers.includes(ingredient.name)
      );

      return {
        ...drink,
        matchCount: alcoholMatches.length + mixerMatches.length,
        matchedIngredients: [...alcoholMatches, ...mixerMatches],
      };
    })
    .filter((drink) => drink.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  // Open modal and set matched ingredients
  const handleOpenModal = (matchedIngredients) => {
    setModalMatches(matchedIngredients);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-10">
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          fontSize: "2rem",
          transition: "0.3s",
          "&:hover": { color: "primary.main" },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: "2.0rem" }} />
        GO BACK
      </IconButton>

      <h1 className="text-3xl font-semibold text-center mb-6">Search Results</h1>

      {/* Display filtered cocktails */}
      <div className="overflow-y-auto max-h-[75vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
        {filteredCocktails.length > 0 ? (
          filteredCocktails.map((drink) => (
            <button
              key={drink.id}
              onClick={() => navigate(`/description/${drink.id}`)}
              className="bg-gray-400 relative border rounded-lg p-4 flex flex-col items-center cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              {/* Clickable Match Count */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating when clicking the match count
                  handleOpenModal(drink.matchedIngredients);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full cursor-pointer hover:scale-155"
              >
                {drink.matchCount}
              </span>

              <img
                src={drink.image}
                alt={drink.name}
                className="w-2/5 object-cover rounded-md mb-2"
              />
              <div className='flex items-center'>
              <h3 className="text-lg font-semibold text-center mr-5">{drink.name}</h3>
              {loggedIn && <AddToFavorites cocktailId={drink.id} />}
              </div>
            </button>
          ))
        ) : (
          <p>No drinks match your filters.</p>
        )}
      </div>
    </div>
      {/* Modal for displaying matched ingredients */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Matching Ingredients</h2>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {modalMatches.length > 0 ? (
              modalMatches.map((ingredient, index) => (
                <Chip key={index} label={ingredient.name} color="primary" />
              ))
            ) : (
              <p>No matches found.</p>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
