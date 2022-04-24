const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// resolvers
const resolvers = {
  // Queries
  Query: {
    // return logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const findUser = await User.findOne({ _id: context.user._id })
          .select('-__v, -password')
          .populate('savedBooks');

        return findUser;
      }

      // if JWT is not valid for user
      throw new AuthenticationError('Please Log in');
    }
  },

  // Mutations
  Mutation: {
    // log in user with email and password
    login: async (parent, { email, password }) => {
      const findUser = await User.findOne({ email });

      // if no user is found with email
      if (!findUser) {
        throw new AuthenticationError('The email or password is incorrect!');
      }

      // bcrypt compare passwords
      const checkPw = await user.isCorrectPassword(password);

      // if passwords do not match
      if (!checkPw) {
        throw new AuthenticationError('The email or password is incorrect!');
      }

      // assign JWT
      const newToken = signToken();

      // return user and token
      return { findUser, newToken };
    }
  }
};

module.exports = { resolvers };
