import gql from 'graphql-tag'

export default gql`
  query {
    allPosts {
      id
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
