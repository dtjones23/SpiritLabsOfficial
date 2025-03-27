require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const { connectDB, mongoose } = require('./config/db');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false,
  introspection: true,
  playground: true,
  cache: 'bounded',
});

async function startServer() {
  try {
    // Connect to MongoDB first
    const dbConnection = await connectDB();
    
    // Then start Apollo Server
    await server.start();
    
    // Apply middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    // Apply Apollo GraphQL middleware
    server.applyMiddleware({ app });
    
    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔮 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
    
    // Handle DB connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();