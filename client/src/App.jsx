import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import GlobalProvider from "./GlobalProvider";

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set up the authentication context for the Apollo Client
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
      <div className="flex h-screen bg-gray-100">
        <Navbar />
        <Container maxWidth="xl" sx={{ pt: "24px", flexGrow: 1 }}>
          <Outlet />
        </Container>
      </div>
      </GlobalProvider>
    </ApolloProvider>
  );
}