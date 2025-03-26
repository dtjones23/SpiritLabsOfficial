require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const path = require('path');
const mongoose = require('./config/db');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const helmet = require('helmet');
const compression = require('compression');
// const depthLimit = require('graphql-depth-limit');
// const { createComplexityLimitRule } = require('graphql-validation-complexity');

const PORT = process.env.PORT || 4001;
const app = express();

// Enhanced Middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));
app.use(compression());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

// Apollo Server configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers
    const auth = authMiddleware({ req });
    return { user: auth.user };
  },
//   validationRules: [
//     depthLimit(5),
//     createComplexityLimitRule(1000, {
//       onCost: (cost) => console.log('Query cost:', cost)
//     })
//   ],
  persistedQueries: false, // Changed from 'bounded' to false for better compatibility
  introspection: true, // Always enable introspection for development
  playground: true, // Always enable playground for development
  cache: 'bounded',
  formatError: (err) => {
    console.error(err); // Log the error for debugging
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    return err;
  }
});

const startServer = async () => {
  try {
    // Connect to MongoDB first
    // const db = await require('./config/db')();
    // console.log('MongoDB connected successfully');
    
    await server.start();
    
    // Apply middleware with CORS settings
    server.applyMiddleware({ 
      app,
      path: '/graphql',
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
      }
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'healthy' });
    });

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist'), {
        //   maxAge: '1y',
        //   immutable: true,
        }));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📌 GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`🛠️ GraphQL Playground: http://localhost:${PORT}${server.graphqlPath}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  console.log('Server closed');
  process.exit(0);
});

startServer();