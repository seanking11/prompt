import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

// Below is test data - will change after initial commit
const schema = `
type Author {
  id: Int!
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}
type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}

type Query {
  posts: [Post]
  author(id: Int!): Author
}

type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})
