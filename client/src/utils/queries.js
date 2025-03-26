import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
      favorites {
        id
        name
        image
      }
    }
  }
`;

export const GET_COCKTAILS = gql`
  query GetCocktails {
    getCocktails {
    id
    name
    createdAt
    image
    ingredients {
      alcohol {
        amount
        name
      }
      garnishes {
        amount
        name
      }
      mixers {
        amount
        name
      }
    }
    favoritesCount
    likedBy {
      id
      username
    }
    ratings {
      rating
      user {
        id
        username
        createdAt
        updatedAt
      }
    }
    averageRating
    assembly
    commentsCount
    comments {
      id
    }
  }
  }
`;

export const GET_COCKTAIL = gql`
query GetCocktail($getCocktailId: ID!) {
  getCocktail(id: $getCocktailId) {
    name
    assembly
    createdAt
    favoritesCount
    id
    image
    ingredients {
      alcohol {
        amount
        name
      }
      garnishes {
        amount
        name
      }
      mixers {
        amount
        name
      }
    }
  }
}`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      favorites {
        id
        name
        image
      }
    }
  }
`;

export const GET_RANDOM_COCKTAIL = gql`
  query GetRandomCocktail {
    getRandomCocktail {
      id
      name
      image
      ingredients {
        alcohol {
          name
          amount
        }
        mixers {
          name
          amount
        }
        garnishes {
          name
          amount
        }
      }
      assembly
      ratings {
        user {
          id
          username
        }
        rating
      }
      comments {
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
      likedBy {
        id
        username
      }
    }
  }
`;
// export const GET_USER_FAVORITES = gql`
//   query GetUser($id: ID!) {
//   getUser(id: $id) {
//     id
//     username
//     favorites {
//       id
//       name
//     }
//   }
// }`;