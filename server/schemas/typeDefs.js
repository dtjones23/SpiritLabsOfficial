const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    favorites: [Cocktail]!
    favoritesCount: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Ingredient {
    name: String!
    amount: String!
  }

  type Ingredients {
    alcohol: [Ingredient]!
    mixers: [Ingredient]!
    garnishes: [Ingredient]!
  }

  type Rating {
    user: User!
    rating: Int!
  }

  type Comment {
    id: ID!
    user: User!
    cocktail: Cocktail!
    text: String!
    replies: [Comment!]!
    likes: [User!]!
    likeCount: Int!
    replyCount: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Cocktail {
    id: ID!
    name: String!
    image: String!
    ingredients: Ingredients!
    assembly: String!
    ratings: [Rating]!
    comments: [Comment]!
    likedBy: [User!]!
    favoritesCount: Int!
    commentsCount: Int!
    averageRating: Float!
    createdAt: String!
    updatedAt: String!
  }
    
  type AuthPayload {
    token: ID!
    user: User!
  }

  type Query {
    getCocktails: [Cocktail]!
    getCocktail(id: ID!): Cocktail
    getUser(id: ID!): User
    getAllUsers: [User]!
    getRandomCocktail: Cocktail
    getUserFavorites(id: ID!): [User]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    heartCocktail(cocktailId: ID!, userId: ID!): Cocktail
    rateCocktail(cocktailId: ID!, rating: Int!): Cocktail
    addComment(userId: ID!, cocktailId: ID!, text: String!): Comment
    replyToComment(commentId: ID!, text: String!): Comment
    heartComment(commentId: ID!): Comment
    favoriteCocktail(userId: ID!, cocktailId: ID!): Cocktail
    removeUser(id: ID!): User
  }
`;

module.exports = typeDefs;
