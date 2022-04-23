import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models';
import { signToken } from '../utils/auth';

// resolvers
export const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const findUser = await User.findOne({ _id: context.user._id })
          .select('-__v, -password')
          .populate('savedBooks');

        return findUser;
      }

      throw new AuthenticationError('Please Log in');
    }
  }
};
