import 'reflect-metadata'
import './dotenv'

// npm install @apollo/server express graphql cors body-parser
// import typeDefs from './graphql/typeDefs'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { resolvers } from './graphql/resolvers'
import { AppDataSource } from './data-source'
import { readFileSync } from 'fs'
import { DataSource } from 'typeorm'
import { randomUUID, RandomUUIDOptions } from 'crypto'
import { Member } from './entity/Member'
import { Product } from './entity/Product'
import { ReviewKeyword } from './entity/ReviewKeyword'

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const typeDefs = readFileSync('./src/graphql/schema.graphql', {
    encoding: 'utf-8',
  })

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  // init typeorm
  const typeormConnection = await AppDataSource.initialize()

  // init test data
  const member = new Member()
  member.email = 'test@test.com'
  member.id = randomUUID()
  member.name = 'test member'

  const product = new Product()
  product.id = randomUUID()
  product.title = 'test product'

  const reviewKeywords = []
  let reviewKeyword = new ReviewKeyword()
  reviewKeyword.id = randomUUID()
  reviewKeyword.title = '사이즈업권장'
  reviewKeywords.push(reviewKeyword)

  reviewKeyword = new ReviewKeyword()
  reviewKeyword.id = randomUUID()
  reviewKeyword.title = '속비침'
  reviewKeywords.push(reviewKeyword)

  reviewKeyword = new ReviewKeyword()
  reviewKeyword.id = randomUUID()
  reviewKeyword.title = '쉽게줄어듬'
  reviewKeywords.push(reviewKeyword)

  await Promise.all([
    typeormConnection.getRepository(Member).save(member),
    typeormConnection.getRepository(Product).save(product),
    typeormConnection.getRepository(ReviewKeyword).save(reviewKeywords),
  ])

  app.use('/', cors<cors.CorsRequest>(), bodyParser.json())
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({
        // token: req.headers.token,
        createUUID: randomUUID,
        connection: typeormConnection,
        testDatas: { member, product },
      }),
    })
  )

  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000/`)
}

startApolloServer()
  .then(() => {})
  .catch(console.error)

export interface MyContext {
  // token?: String
  createUUID(options?: RandomUUIDOptions): string
  connection: DataSource
  testDatas: { member: Member; product: Product }
}
