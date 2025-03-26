const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true }
});

const CocktailSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    index: true
  },
  image: {
    type: String,
    required: true,
    default: './images/default-cocktail.webp',
    validate: {
      validator: function(v) {
        return /^\.\/images\/.+\.(webp|jpg|jpeg|png)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image path!`
    }
  },
  ingredients: {
    alcohol: [IngredientSchema],
    mixers: [IngredientSchema],
    garnishes: [IngredientSchema]
  },
  assembly: { 
    type: String, 
    required: true,
    trim: true
  },
  ratings: [{ 
    user: { type: Schema.Types.ObjectId, ref: 'User' }, 
    rating: { type: Number, min: 1, max: 5 } 
  }],
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  favoritesCount: { 
    type: Number, 
    default: 0,
    index: true
  },
  likedBy: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    index: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
CocktailSchema.index({ createdAt: -1 });
CocktailSchema.index({ name: 'text', 'ingredients.alcohol.name': 'text', 'ingredients.mixers.name': 'text' });

// Virtual for average rating
CocktailSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Virtual for comments count
CocktailSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

module.exports = mongoose.model('Cocktail', CocktailSchema);