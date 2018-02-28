import gql from 'graphql-tag'

export default gql`
  mutation createUserQuery ($authProvider: AuthProviderSignupData!) {
    createUser(authProvider: $authProvider) {
      id
      email
      createdAt
    }
  }
`
