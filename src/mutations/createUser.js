import gql from 'graphql-tag'

export default gql`
  mutation createUserQuery ($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      changedUser {
        id
        username
        createdAt
      }
    }
  }
`
