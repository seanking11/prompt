import gql from 'graphql-tag'

export default gql`
  query($userId: ID!) {
    allPosts(filter: {
      user: {
        id: $userId
      }
    }) {
      caption
      likes {
        id
        user {
          id
        }
      }
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
