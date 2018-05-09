import gql from 'graphql-tag'

export default gql`
  mutation createPostMutation($caption: String!, $fileId: ID!, $userId: ID!, $promptId: ID!) {
    createPost(caption: $caption, fileId: $fileId, userId: $userId, promptId: $promptId) {
      id
      caption
      file {
        id
        size
        secret
        createdAt
        post {
          id
          caption
        }
      }
    }
  }
`
