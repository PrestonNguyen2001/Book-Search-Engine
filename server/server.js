const express = require("express");
const path = require("path");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(
  cors({
    origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    cache: "bounded", 
    persistedQueries: false, 
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startServer();

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

// Use API routes
app.use("/api", routes);
