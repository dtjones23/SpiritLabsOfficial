const mongoose = require("../config/db");

const CocktailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: {
    alcohol: [{ name: { type: String }, amount: { type: String } }],
    mixers: [{ name: { type: String }, amount: { type: String } }],
    garnishes: [{ name: { type: String }, amount: { type: String } }]
  },
  assembly: { type: String, required: true },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId }, rating: { type: Number } }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  favoritesCount: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});


module.exports = mongoose.model("Cocktail", CocktailSchema);

