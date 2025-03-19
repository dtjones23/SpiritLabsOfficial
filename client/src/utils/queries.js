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

export const GET_COCKTAIL = gql`
  query GetCocktail($id: ID!) {
    getCocktail(id: $id) {
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