import gql from 'graphql-tag'

export default gql`
  mutation createLike($postId: ID!, $userId: ID!) {
    createLike(postId: $postId, userId: $userId) {
      id
    }
  }
`
