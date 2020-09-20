const noTokenResponse = {
  success: false,
  message: 'No token.',
};

export default {
  register: async (_, { input: { login, password } }, { dataSources }) => {
    const registeredUser = await dataSources.userAPI.registerUser({
      login,
      password,
    });
    return registeredUser;
  },
  login: async (_, { input: { login, password } }, { dataSources }) => {
    const loggedInUser = await dataSources.userAPI.loginUser({
      login,
      password,
    });
    return loggedInUser;
  },
  accessTokenVerify: async (_, { authorization }, { dataSources }) => {
    const accessTokenStatus = await dataSources.userAPI.accessTokenVerify(
      authorization
    );
    return accessTokenStatus;
  },
  refreshTokenVerify: async (_, { refreshToken }, { dataSources }) => {
    const refreshTokenStatus = await dataSources.userAPI.refreshTokenVerify(
      refreshToken
    );
    return refreshTokenStatus;
  },
  deleteUser: async (_, { userId }, { dataSources }) => {
    const deletedUser = await dataSources.userAPI.deleteUser(userId);
    return deletedUser;
  },
  editUser: async (_, { userId, userData }, { dataSources }) => {
    const editedUser = await dataSources.userAPI.editUser(userId, userData);
    return editedUser;
  },
  addCardToFavourite: async (_, { userId, cardId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const card = await dataSources.hearthstoneAPI.getCard(token?.access_token, {
      id: cardId,
    });
    if (!card) return null;

    const userWithAddedFavouriteCard = await dataSources.userAPI.addCardToFavourite(
      userId,
      card
    );
    return userWithAddedFavouriteCard;
  },
  deleteCardFromFavourite: async (_, { userId, cardId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const card = await dataSources.hearthstoneAPI.getCard(token?.access_token, {
      id: cardId,
    });
    if (!card) return null;

    const userWithDeletedFavouriteCard = await dataSources.userAPI.deleteCardFromFavourite(
      userId,
      card
    );
    return userWithDeletedFavouriteCard;
  },
  createDeck: async (_, { userId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const createdDeck = await dataSources.userAPI.createDeck(userId);
    return createdDeck;
  },
  deleteDeck: async (_, { userId, deckId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const decks = await dataSources.userAPI.deleteDeck(userId, deckId);
    return decks;
  },
  addCardToDeck: async (_, { userId, deckId, cardId }, { dataSources }) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const card = await dataSources.hearthstoneAPI.getCard(token?.access_token, {
      id: cardId,
    });
    if (!card) return null;

    const user = await dataSources.userAPI.addCardToDeck(userId, deckId, card);
    return user;
  },
  deleteCardFromDeck: async (
    _,
    { userId, deckId, cardId },
    { dataSources }
  ) => {
    const token = dataSources.hearthstoneAPI.context?.token;
    if (!token) return noTokenResponse;

    const user = await dataSources.userAPI.deleteCardFromDeck(
      userId,
      deckId,
      cardId
    );
    return user;
  },
};
