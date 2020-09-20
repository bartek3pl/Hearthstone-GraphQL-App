import { gql } from 'apollo-server';

const typeDefs = gql`
  type Mutation {
    """
    Register user with login and password.
    """
    register(input: UserInput): HandleUserResponse

    """
    Login and authorize user with login and password.
    """
    login(input: UserInput): LoginUserResponse

    """
    Verify access token.
    """
    accessTokenVerify(authorization: String): VerifyAccessTokenResponse

    """
    Verify refresh token.
    """
    refreshTokenVerify(refreshToken: String): VerifyRefreshTokenResponse

    """
    Delete user from database.
    """
    deleteUser(userId: ID): HandleUserResponse

    """
    Edit user in database.
    """
    editUser(userId: ID, userData: UserInput): HandleUserResponse

    """
    Adds chosen card to chosen user favourites cards.
    """
    addCardToFavourite(userId: ID, cardId: ID): HandleUserResponse

    """
    Deletes chosen card from chosen user favourites cards.
    """
    deleteCardFromFavourite(userId: ID, cardId: ID): HandleUserResponse

    """
    Creates new deck.
    """
    createDeck(userId: ID): HandleDeckResponse

    """
    Deletes chosen deck.
    """
    deleteDeck(userId: ID, deckId: ID): HandleDecksResponse

    """
    Adds chosen card to chosen deck of chosen user.
    """
    addCardToDeck(userId: ID, deckId: ID, cardId: ID): HandleUserResponse

    """
    Deletes chosen card from chosen deck of chosen user.
    """
    deleteCardFromDeck(userId: ID, deckId: ID, cardId: ID): HandleUserResponse
  }
`;

export default typeDefs;
