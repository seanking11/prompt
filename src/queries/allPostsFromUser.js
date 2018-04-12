import gql from 'graphql-tag'

export default gql`
  query($userId: ID!) {
    allPosts(filter: {
      user: {
        id: $userId
      }
    }) {
      caption
      prompt {
        title
      }
      user {
        firstName
        lastName
        file {
          url
        }
      }

    }
  }
`
