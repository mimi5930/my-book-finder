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
        const user = await User.findOne({ _id: context.user._id }).select(
          '-__v, -password'
        );

        return user;
      }

      // if JWT is not valid for user
      throw new AuthenticationError('Please Log in');
    }
  },

  // Mutations
  Mutation: {
    // log in user with email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      // if no user is found with email
      if (!user) {
        throw new AuthenticationError('The email or password is incorrect!');
      }

      // bcrypt compare passwords
      const checkPw = await user.isCorrectPassword(password);

      // if passwords do not match
      if (!checkPw) {
        throw new AuthenticationError('The email or password is incorrect!');
      }

      // assign JWT
      const token = signToken(user);

      // return user and token
      return { user, token };
    },

    // create new user
    addUser: async (parent, args) => {
      console.log(args);

      // create user in the database
      const user = await User.create(args);

      // assign the user a JWT
      const token = signToken(user);

      console.log(token);

      return { user, token };
    },

    // save book to user
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true, runValidators: true }
        );

        return user;
      }

      throw new AuthenticationError('Please log in to save a book!');
    },

    // remove book from user's savedBooks array
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('Please log in to remove a book!');
    }
  }
};

module.exports = { resolvers };
