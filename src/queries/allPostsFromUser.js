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
        id
        title
      }
      user {
        id
        firstName
        lastName
        file {
          id
          url
        }
      }

    }
  }
`
