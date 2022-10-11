// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import resolvers from './graphql/resolvers'
// import typeDefs from './graphql/typeDefs'
import { readFileSync } from 'fs'

export interface MyContext {
  token?: String
}

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express()
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app)

  const typeDefs = readFileSync('./src/graphql/schema.graphql', {
    encoding: 'utf-8',
  })

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  // Ensure we wait for our server to start
  await server.start()

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use('/', cors<cors.CorsRequest>(), bodyParser.json())
  app.use(
    '/graphql', // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  )

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000/`)
}

startApolloServer()
