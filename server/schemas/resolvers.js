const { AuthenticationError } = require('apollo-server-express')
const { Book, User } = require('../models')
const { signToken } = require('../utils/auth.js')

const resolvers = {
  Query: {
    books: async () => await Book.find({}),
    book: async (parent, { _id }) => await Book.findById(_id)
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    }

  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email })

    if (!user) {
      throw new AuthenticationError('Incorrect')
    }
    const correctPassword = await user.isCorrectPassword(password)

    if (!correctPassword) {
      throw new AuthenticationError('Incorrect')
    }
    const token = signToken(user)
    return { token, user }
  },
  saveBook: async (parent, { bookData }, context) => {
    if (context.user) {
      const updateUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: bookData } },
        { new: true }
      )
      return updateUser
    }
    throw new AuthenticationError('Please Log In')
  }
}

module.exports = resolvers