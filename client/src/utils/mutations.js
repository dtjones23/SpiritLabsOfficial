import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
    user {
      createdAt
      username
      id
      email
    }
  }
}
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const HEART_COCKTAIL = gql`
  mutation HeartCocktail($cocktailId: ID!) {
    heartCocktail(cocktailId: $cocktailId) {
      id
      likes {
        id
        username
      }
    }
  }
`;

export const RATE_COCKTAIL = gql`
  mutation RateCocktail($cocktailId: ID!, $rating: Int!) {
    rateCocktail(cocktailId: $cocktailId, rating: $rating) {
      id
      ratings {
        user {
          id
          username
        }
        rating
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($cocktailId: ID!, $text: String!, $userId: ID!) {
  addComment(cocktailId: $cocktailId, text: $text, userId: $userId) {
      id
      user {
        id
        username
      }
      text
      replies {
        id
        text
      }
      likes {
        id
        username
      }
    }
  }
`;

export const REPLY_TO_COMMENT = gql`
  mutation ReplyToComment($commentId: ID!, $text: String!) {
    replyToComment(commentId: $commentId, text: $text) {
      id
      user {
        id
        username
      }
      text
      replies {
        id
        text
      }
      likes {
        id
        username
      }
    }
  }
`;

export const HEART_COMMENT = gql`
  mutation HeartComment($commentId: ID!) {
    heartComment(commentId: $commentId) {
      id
      likes {
        id
        username
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($userId: ID!, $cocktailId: ID!) {
    favoriteCocktail(userId: $userId, cocktailId: $cocktailId) {
      id
      name
      image
      favoritesCount
      likedBy {
        id
        username
      }
    }
  }
`;