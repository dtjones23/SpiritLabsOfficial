import { useState } from "react";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const alcoholTypes = ["Absinthe", "Amaretto", "Apple Brandy", "Apricot Brandy", "Baileys Irish Cream", "Bénédictine", "Blackberry Liqueur", 
  "Blue Curaçao", "Brandy", "Calvados", "Campari", "Chambord", "Cherry Brandy", "Cherry Heering", "Citron Vodka", "Coconut Rum", "Coffee Liqueur", "Cointreau", 
  "Crème de Cassis", "Crème de Cacao", "Crème de Menthe", "Crème de Violette", "Damiana Liqueur", "Dark Rum", "Drambuie", 
  "Frangelico", "Galliano", "Gin", "Gold Rum", "Gold Tequila", "Grand Marnier", "Green Chartreuse", "Irish Cream Liqueur", 
  "Kahlúa", "Lillet Blanc", "Light Rum", "Lychee Liqueur", "Mandarine Napoleon", "Maraschino Liqueur", "Mezcal", "Midori", 
  "Orange Curaçao", "Orange Liqueur", "Overproof Rum", "Peach Schnapps", "Peppermint Schnapps", "Pepper Tequila", "Pernod", "Reposado Tequila", "Ruby Port", "Silver Tequila", 
  "Sloe Gin", "Southern Comfort", "Strawberry Liqueur", "Sweet Vermouth", "Tequila", "Tia Maria", "Triple Sec", "Tuaca", 
  "Vanilla Vodka", "Vermouth", "Vodka", "Whiskey"];
const mixers = ["Angostura Bitters", "Bitters", "Champagne", "Club Soda", "Cinnamon Syrup", "Coconut Cream",
  "Cold Espresso", "Cola", "Cranberry Juice", "Cream", "Dry Vermouth", "Egg White", 
  "Espresso", "Ginger Ale", "Ginger Beer", "Grapefruit Juice", "Grenadine", "Half-and-Half", "Heavy Cream", "Honey Syrup", "Hot Coffee", "Lemon Juice", 
  "Lemon-Lime Soda", "Lime Juice", "Lychee Juice", "Maraschino Cherry Juice", "Orange Juice", "Peychauds Bitters", "Pineapple Juice", 
  "Prickly Pear Juice", "Red Bull", "Simple Syrup", "Sweet and Sour Mix", 
  "Tangerine Juice", "Tomato Juice", "Tonic Water"];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlcohol, setSelectedAlcohol] = useState([]);
  const [selectedMixers, setSelectedMixers] = useState([]);
  const [showAlcoholDropdown, setShowAlcoholDropdown] = useState(false);
  const [showMixersDropdown, setShowMixersDropdown] = useState(false);
  const [alcoholSearchTerm, setAlcoholSearchTerm] = useState("");
  const [mixerSearchTerm, setMixerSearchTerm] = useState("");

  const handleSelect = (item, type) => {
    if (type === "alcohol") {
      setSelectedAlcohol(selectedAlcohol.includes(item)
        ? selectedAlcohol.filter((i) => i !== item)
        : [...selectedAlcohol, item]);
    } else {
      setSelectedMixers(selectedMixers.includes(item)
        ? selectedMixers.filter((i) => i !== item)
        : [...selectedMixers, item]);
    }
  };

  const removeFilter = (item, type) => {
    if (type === "alcohol") {
      setSelectedAlcohol(selectedAlcohol.filter((i) => i !== item));
    } else {
      setSelectedMixers(selectedMixers.filter((i) => i !== item));
    }
  };

  const clearFilters = () => {
    setSelectedAlcohol([]);
    setSelectedMixers([]);
    setSearchTerm("");
  };

  const filteredAlcoholTypes = alcoholTypes.filter((type) =>
    type.toLowerCase().includes(alcoholSearchTerm.toLowerCase())
  );

  const filteredMixers = mixers.filter((mixer) =>
    mixer.toLowerCase().includes(mixerSearchTerm.toLowerCase())
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Search Drinks</h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search drinks by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-4/5 p-2 border rounded-lg"
        />
      </div>

      <div className="flex space-x-4 mt-4 justify-center">
        {/* Alcohol Selection */}
        <div className="relative">
          <button
            onClick={() => setShowAlcoholDropdown(!showAlcoholDropdown)}
            className="bg-gray-800 text-white flex items-center justify-between px-10 py-3 text-lg rounded-lg w-full cursor-pointer"
          >
            Select Alcohol(s)
            {showAlcoholDropdown ? <ArrowDropDownOutlinedIcon className="ml-2" /> : <ArrowLeftOutlinedIcon className="ml-2" />}
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
        <div className="relative">
          <button
            onClick={() => setShowMixersDropdown(!showMixersDropdown)}
            className="bg-gray-800 text-white flex items-center justify-between px-10 py-3 text-lg rounded-lg cursor-pointer"
          >
            Select Mixer(s)
            {showMixersDropdown ? <ArrowDropDownOutlinedIcon className="ml-2" /> : <ArrowLeftOutlinedIcon className="ml-2" />}
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
        <div className="mt-4 bg-gray-200 p-4 rounded-lg ">
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
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Search Drinks</button>
        <button onClick={clearFilters} className="bg-red-600 text-white px-6 py-2 rounded-lg">Clear Selection</button>
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
    <button onClick={() => removeFilter(item, type)} className="ml-2 text-red-400">✕</button>
  </div>
);
