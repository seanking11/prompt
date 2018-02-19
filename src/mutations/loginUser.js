import gql from 'graphql-tag'

export default gql`
  mutation LoginUserQuery ($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        username
        id
        lastLogin
        createdAt
      }
    }
  }
`
