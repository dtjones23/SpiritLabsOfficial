const User = require("../models/User");
const Cocktail = require("../models/Cocktail");
const Comment = require("../models/Comment");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    getAllUsers: async () => await User.find(),
    
    getCocktails: async () => 
      await Cocktail.find().populate("likedBy").populate("comments").exec(),

    getCocktail: async (_, { id }) => 
      await Cocktail.findById(id).populate("comments").populate("likedBy").exec(),

    getUser: async (_, { id }) => 
      await User.findById(id).populate("favorites").exec(),

    getUserFavorites: async (_, { id }) => {
      const user = await User.findById(id).populate("favorites");
      return user.favorites;
    },

    getRandomCocktail: async () => {
      const count = await Cocktail.countDocuments();
      const random = Math.floor(Math.random() * count);
      return await Cocktail.findOne().skip(random).populate("comments").populate("likedBy").exec();
    },
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Email already in use.");

        const user = new User({ username, email, password });
        await user.save();
        return { token: signToken(user), user };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new AuthenticationError("User not found.");

        const isValid = await user.isCorrectPassword(password);
        if (!isValid) throw new AuthenticationError("Invalid email or password.");

        return { token: signToken(user), user };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    removeUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error("User not found.");
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    favoriteCocktail: async (_, { userId, cocktailId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User does not exist");

        const cocktail = await Cocktail.findById(cocktailId);
        if (!cocktail) throw new Error("Cocktail not found.");

        const isFavorited = user.favorites.includes(cocktailId);

        if (!isFavorited) {
          user.favorites.push(cocktailId);
          cocktail.favoritesCount += 1;
          if (!cocktail.likedBy.includes(userId)) {
            cocktail.likedBy.push(userId);
          }
        } else {
          user.favorites = user.favorites.filter((id) => id.toString() !== cocktailId);
          cocktail.favoritesCount = Math.max(0, cocktail.favoritesCount - 1);
          cocktail.likedBy = cocktail.likedBy.filter((id) => id.toString() !== userId);
        }

        await user.save();
        await cocktail.save();

        return cocktail.populate("likedBy");
      } catch (error) {
        throw new Error(error.message);
      }
    },

    addComment: async (_, { userId, cocktailId, text }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User does not exist");

        const cocktail = await Cocktail.findById(cocktailId);
        if (!cocktail) throw new Error("Cocktail not found.");

        const comment = await Comment.create({ user: userId, cocktail: cocktailId, text });
        cocktail.comments.push(comment._id);
        await cocktail.save();

        return comment.populate("user");
      } catch (error) {
        throw new Error(error.message);
      }
    },

    replyToComment: async (_, { userId, commentId, text }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User does not exist");

        const parentComment = await Comment.findById(commentId).populate("cocktail");
        if (!parentComment) throw new Error("Comment not found.");

        const reply = await Comment.create({ user: userId, cocktail: parentComment.cocktail, text });
        parentComment.replies.push(reply._id);
        await parentComment.save();

        return reply.populate("user");
      } catch (error) {
        throw new Error(error.message);
      }
    },

    heartComment: async (_, { commentId, userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new AuthenticationError("User does not exist.");

        const comment = await Comment.findById(commentId);
        if (!comment) throw new Error("Comment not found.");

        const index = comment.likes.indexOf(userId);
        if (index === -1) {
          comment.likes.push(userId);
        } else {
          comment.likes.splice(index, 1);
        }
        await comment.save();

        return comment.populate("user");
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;