import { db } from "./db";
import * as schema from "./db/schema";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { userTypeDefs } from './modules/user/userSchema';
import { userResolver } from './modules/user/userResolver';
interface MyContext {
    token?: string;
}

const typeDefs = userTypeDefs;

const resolvers = userResolver;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at http://localhost:4000/`);