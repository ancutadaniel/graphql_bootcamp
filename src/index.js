import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const server = new GraphQLServer({
  // The schema.graphql file is the schema definition language (SDL) file
  typeDefs: './src/schema.graphql',
  // The resolvers object is the actual implementation of the GraphQL schema
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  // The context object is available in all resolvers as the third argument
  context: {
    db,
  },
});

server.start(() => {
  console.log('The server is up! http://localhost:4000');
});
