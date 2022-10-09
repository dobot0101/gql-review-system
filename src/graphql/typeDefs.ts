import { gql } from 'apollo-server';

export default gql`
  type Query {
    books: [Book]
  }

  type Book {
    id: ID!
    title: String
    author: Author
  }

  type Author {
    name: String
    email: String
  }
`;
