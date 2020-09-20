const noTokenResponse = {
  success: false,
  message: 'No token.',
};

export default {
  cards: async (_, __, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const cards = await dataSources.hearthstoneAPI.getCards(
      token?.access_token
    );
    return cards;
  },
  card: async (_, { id }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const card = await dataSources.hearthstoneAPI.getCard(token?.access_token, {
      id,
    });
    return card;
  },
  cardsByClassName: async (_, { className }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const cardsByClassName = await dataSources.hearthstoneAPI.getCardsByClassName(
      token?.access_token,
      { className }
    );
    return cardsByClassName;
  },
  cardsByExpansion: async (_, { expansion }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const cardsByExpansion = await dataSources.hearthstoneAPI.getCardsByExpansion(
      token?.access_token,
      { expansion }
    );
    return cardsByExpansion;
  },
  userFavouriteCards: async (_, { userId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const userFavouriteCards = dataSources.userAPI.getUserFavouriteCards(
      userId
    );
    return userFavouriteCards;
  },
  userDecks: async (_, { userId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const userDecks = dataSources.userAPI.getUserDecks(userId);
    return userDecks;
  },
  userDeck: async (_, { userId, deckId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const userDeck = dataSources.userAPI.getUserDeck(userId, deckId);
    return userDeck;
  },
};
