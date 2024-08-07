import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

// Use environment variable for the GraphQL endpoint
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        savedBooks: {
          merge(existing = [], incoming) {
            const existingBookIds = existing.map((book) => book.bookId);
            const filteredIncoming = incoming.filter(
              (book) => !existingBookIds.includes(book.bookId)
            );
            return [...existing, ...filteredIncoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
