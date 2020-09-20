import queryResolvers from './queries/queryResolvers';
import mutationResolvers from './mutations/mutationResolvers';

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export default resolvers;
