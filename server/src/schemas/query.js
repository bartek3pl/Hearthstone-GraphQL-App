import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    """
    Returns first 40 cards from all cards from Hearthstone API.
    """
    cards: [Card]

    """
    Returns one card by card ID from Hearthstone API.
    """
    card(id: Int!): Card

    """
    Returns first 40 cards from chosen class from Hearthstone API.
    """
    cardsByClassName(className: ClassName!): [Card]

    """
    Returns first 40 cards from chosen expansion from Hearthstone API.
    """
    cardsByExpansion(expansion: Expansion!): [Card]

    """
    Returns all favourite cards of chosen user.
    """
    userFavouriteCards(userId: ID!): FavouriteCardsResponse

    """
    Returns all decks of chosen user.
    """
    userDecks(userId: ID!): HandleDecksResponse

    """
    Returns chosen deck of chosen user.
    """
    userDeck(userId: ID!, deckId: ID!): HandleDeckResponse
  }
`;

export default typeDefs;
