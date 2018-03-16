import gql from 'graphql-tag'

export default gql`
  query {
    allPosts {
      caption
      updatedAt
      file {
        url
      }
      user {
        email
      }
    }
  }
`
