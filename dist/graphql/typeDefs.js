"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql) `
  type Query {
    reviews: [Review!]
  }

  type Product {
    id: ID!
    title: String
  }

  type ReviewKeyword {
    id: ID!
    title: String!
  }

  type Review {
    id: ID!
    product: Product!
    content: String!
    keywords: [ReviewKeyword!]
    likeCount: Int!
    hateCount: Int!
  }

  type ReviewLike {
    id: ID!
    review: Review!
    member: Member!
  }

  type ReviewHate {
    id: ID!
    review: Review!
    member: Member!
  }
`;
