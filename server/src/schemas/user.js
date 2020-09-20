import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    _id: ID!
    login: String!
    password: String!
    createdDate: String!
    updatedDate: String!
    favouriteCards: [Card!]
    decks: [Deck!]
  }

  type Deck {
    _id: ID!
    cards: [Card!]
  }

  type Token {
    accessToken: String
    refreshToken: String
  }

  interface Response {
    success: Boolean!
    message: String!
  }

  type LoginUserResponse implements Response {
    success: Boolean!
    message: String!
    user: User
    token: Token
  }

  type HandleUserResponse implements Response {
    success: Boolean!
    message: String!
    user: User
  }

  type VerifyAccessTokenResponse implements Response {
    success: Boolean!
    message: String!
  }

  type VerifyRefreshTokenResponse implements Response {
    success: Boolean!
    message: String!
    token: Token
  }

  type FavouriteCardsResponse implements Response {
    success: Boolean!
    message: String!
    favouriteCards: [Card!]
  }

  type HandleDeckResponse implements Response {
    success: Boolean!
    message: String!
    deck: Deck
  }

  type HandleDecksResponse implements Response {
    success: Boolean!
    message: String!
    decks: [Deck!]
  }

  input UserInput {
    login: String!
    password: String!
  }
`;

export default typeDefs;
