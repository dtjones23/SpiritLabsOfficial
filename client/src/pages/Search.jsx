import { useState, useEffect } from "react";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { GET_COCKTAILS } from "../utils/queries";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlcohol, setSelectedAlcohol] = useState([]);
  const [selectedMixers, setSelectedMixers] = useState([]);
  const [showAlcoholDropdown, setShowAlcoholDropdown] = useState(false);
  const [showMixersDropdown, setShowMixersDropdown] = useState(false);
  const [alcoholSearchTerm, setAlcoholSearchTerm] = useState("");
  const [mixerSearchTerm, setMixerSearchTerm] = useState("");
  const [alcoholIngredients, setAlcoholIngredients] = useState([]);
  const [mixerIngredients, setMixerIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const navigate = useNavigate();
  
  const { loading, error, data } = useQuery(GET_COCKTAILS);

  useEffect(() => {
    if (!loading && data) {
      const formulaArray = data.getCocktails;

      const alcoholList = formulaArray.flatMap((formula) =>
        formula.ingredients.alcohol.map((ingredient) => ingredient.name)
      );

      const mixerList = formulaArray.flatMap((formula) =>
        formula.ingredients.mixers.map((ingredient) => ingredient.name)
      );

      setAlcoholIngredients([...new Set(alcoholList)]);
      setMixerIngredients([...new Set(mixerList)]);
    }
  }, [loading, data]);

  useEffect(() => {
    if (data?.getCocktails) {
      let filteredCocktails = data.getCocktails;
  
      // Filter by search term (drink name)
      if (searchTerm) {
        filteredCocktails = filteredCocktails.filter((formula) =>
          formula.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    // console.log(data.getCocktails);
      // Limit results
      setCocktails(filteredCocktails.slice(0, 6));
    } else {
      setCocktails([]);
    }
    
  }, [searchTerm, selectedAlcohol, selectedMixers, data]);

  const filteredAlcoholTypes = alcoholIngredients.filter((type) =>
    type.toLowerCase().includes(alcoholSearchTerm.toLowerCase())
  );

  const filteredMixers = mixerIngredients.filter((mixer) =>
    mixer.toLowerCase().includes(mixerSearchTerm.toLowerCase())
  );

  const handleSelect = (item, type) => {
    if (type === "alcohol") {
      setSelectedAlcohol((prev) =>
        prev.includes(item) ? prev : [...prev, item]
      );
    } else if (type === "mixer") {
      setSelectedMixers((prev) => (prev.includes(item) ? prev : [...prev, item]));
    }
  };

  const handleSearch = () => {
    // Redirect to the Results page with selected filters
    navigate('/results', {
      state: {
        selectedAlcohol,
        selectedMixers,
      },
    });
  };

  const removeFilter = (item, type) => {
    if (type === "alcohol") {
      setSelectedAlcohol((prev) => prev.filter((alcohol) => alcohol !== item));
    } else if (type === "mixer") {
      setSelectedMixers((prev) => prev.filter((mixer) => mixer !== item));
    }
  };

  const clearFilters = () => {
    setSelectedAlcohol([]);
    setSelectedMixers([]);
    setSearchTerm("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Search Drinks</h1>
      
      {/* Search Input */}
      <div className="flex justify-center">
        <input
        type="text"
        placeholder="Search drinks by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-4/5 p-2 border rounded-lg"
        />
      </div>
    
      {/* Live Search Results */}
      {searchTerm && (
        <div className="mt-4 max-h-60 overflow-y-auto rounded-lg p-4 shadow-lg bg-white">
          {cocktails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cocktails.map((drink) => (
                <div
                  key={drink.id}
                  onClick={() => navigate(`/description/${drink.id}`)}
                  className="border rounded-lg flex flex-col items-center cursor-pointer hover:shadow-2xl transition-shadow bg-gray-100 p-2"
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-32 h-32 object-cover rounded-full mb-3"
                  />
                  <h3 className="text-lg font-semibold text-center text-gray-800">
                    {drink.name}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No drinks found.</p>
          )}
        </div>
      )}
      <div className="flex space-x-4 mt-4 justify-center">
        {/* Alcohol Selection */}
        <div className="relative w-1/3">
          <button
            onClick={() => setShowAlcoholDropdown(!showAlcoholDropdown)}
            className="bg-gray-800 text-white flex items-center justify-between px-6 py-3 text-lg rounded-lg w-full cursor-pointer hover:scale-105"
          >
            Select Alcohol(s)
            {showAlcoholDropdown ? (
              <ArrowDropDownOutlinedIcon className="ml-2" />
            ) : (
              <ArrowLeftOutlinedIcon className="ml-2" />
            )}
          </button>
          {showAlcoholDropdown && (
            <DropdownList
              searchTerm={alcoholSearchTerm}
              setSearchTerm={setAlcoholSearchTerm}
              items={filteredAlcoholTypes}
              selectedItems={selectedAlcohol}
              handleSelect={(item) => handleSelect(item, "alcohol")}
            />
          )}
        </div>
    
        {/* Mixer Selection */}
        <div className="relative w-1/3">
          <button
            onClick={() => setShowMixersDropdown(!showMixersDropdown)}
            className="bg-gray-800 text-white flex items-center justify-between px-6 py-3 text-lg rounded-lg w-full cursor-pointer hover:scale-105"
          >
            Select Mixer(s)
            {showMixersDropdown ? (
              <ArrowDropDownOutlinedIcon className="ml-2" />
            ) : (
              <ArrowLeftOutlinedIcon className="ml-2" />
            )}
          </button>
          {showMixersDropdown && (
            <DropdownList
              searchTerm={mixerSearchTerm}
              setSearchTerm={setMixerSearchTerm}
              items={filteredMixers}
              selectedItems={selectedMixers}
              handleSelect={(item) => handleSelect(item, "mixer")}
            />
          )}
        </div>
      </div>
    
      {/* Selected Filters */}
      <div className="mt-4 bg-gray-200 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-center">Selected Filters:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedAlcohol.map((item) => (
            <FilterTag key={item} item={item} type="alcohol" removeFilter={removeFilter} />
          ))}
          {selectedMixers.map((item) => (
            <FilterTag key={item} item={item} type="mixer" removeFilter={removeFilter} />
          ))}
        </div>
      </div>
    
      {/* Search & Clear Buttons */}
      <div className="mt-4 flex space-x-4 justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:scale-120"
        >
          Search Drinks
        </button>
        <button onClick={clearFilters} className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:scale-120">
          Clear Selection
        </button>
      </div>
    </div>
  );
}


// Dropdown List Component
const DropdownList = ({ searchTerm, setSearchTerm, items, selectedItems, handleSelect }) => (
  <div className="z-10 mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto w-full">
    <div className="flex items-center border-b">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 border-b"
    />
    {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-2 text-red-400 cursor-pointer"
                >
                    <DeleteForeverIcon />
                </button>
              )}
              </div>
    {items.map((item) => (
      <div
        key={item}
        onClick={() => handleSelect(item)}
        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${selectedItems.includes(item) ? "bg-gray-300" : ""}`}
      >
        {item}
      </div>
    ))}
  </div>
);

// Filter Tag Component
const FilterTag = ({ item, type, removeFilter }) => (
  <div className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full">
    {item}
    <button onClick={() => removeFilter(item, type)} className="ml-2 text-red-400 cursor-pointer">✕</button>
  </div>
);
