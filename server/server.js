require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/db");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 4001;
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req: authMiddleware({ req }) }),
    persistedQueries: { cache: "bounded" }, // Enable bounded cache for persisted queries
});

// Start Apollo Server
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));

        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    mongoose.connection.once("open", () => {
        app.listen(PORT, () => {
            console.log(`🚀 API server running on port ${PORT}!`);
            console.log(`📌 GraphQL available at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloServer();
