import { ApolloServer } from 'apollo-server'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ port }) => {
  console.log(`Server is now listening on localhost:${port}`)
})
