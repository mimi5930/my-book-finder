const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// resolvers
const resolvers = {
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

module.exports = { resolvers };
