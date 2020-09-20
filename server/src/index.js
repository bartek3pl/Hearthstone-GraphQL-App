import { ApolloServer } from 'apollo-server';

import Query from './schemas/query';
import Mutation from './schemas/mutation';
import User from './schemas/user';
import Hearthstone from './schemas/hearthstone';

import resolvers from './resolvers/resolvers';

import HearthstoneAPI from './dataSources/hearthstoneAPI/hearthstoneAPI';
import UserAPI from './dataSources/userAPI/userAPI';
import getToken from './dataSources/hearthstoneAPI/token';

const server = new ApolloServer({
  context: async () => {
    const { token } = await getToken();
    if (!token) throw new Error('Invalid hearthstone API token.');
    return { token };
  },
  typeDefs: [Query, Mutation, Hearthstone, User],
  resolvers,
  dataSources: () => ({
    hearthstoneAPI: new HearthstoneAPI(),
    userAPI: new UserAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
