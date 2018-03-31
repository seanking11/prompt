import gql from 'graphql-tag'

export default gql`
  query($fetchAfterDate: DateTime!) {
    allPosts(filter: {
      createdAt_gte: $fetchAfterDate
    }, orderBy: updatedAt_DESC) {
      caption
      file {
        url
      }
      user {
        firstName
        lastName
      }
    }
  }
`
