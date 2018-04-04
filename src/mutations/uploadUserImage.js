import gql from 'graphql-tag'

export default gql`
  mutation uploadUserImage($fileFileId: ID!, $userUserId: ID!){
    setUserOnFile(fileFileId: $fileFileId, userUserId: $userUserId) {
      userUser {
        id
      }
    }
  }
`
