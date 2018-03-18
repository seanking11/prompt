import gql from 'graphql-tag'

export default gql`
  query {
    allPosts(orderBy: updatedAt_DESC) {
      caption
      updatedAt
      file {
        url
      }
      user {
        email
        firstName
        lastName
      }
    }
  }
`
