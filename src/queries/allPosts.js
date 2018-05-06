import gql from 'graphql-tag'

export default gql`
  query($fetchAfterDate: DateTime!) {
    allPosts(filter: {
      createdAt_gte: $fetchAfterDate
    }, orderBy: updatedAt_DESC) {
      id
      caption
      likes {
        id
        user {
          id
        }
      }
      file {
        id
        url
      }
      user {
        id
        firstName
        lastName
        file {
          url
        }
      }
    }
  }
`
