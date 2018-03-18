import gql from 'graphql-tag'

export default gql`
  mutation createUserMutation($firstName: String!, $lastName: String! $authProvider: AuthProviderSignupData!) {
    createUser(firstName: $firstName, lastName: $lastName, authProvider: $authProvider) {
      id
      email
      firstName
      lastName
    }
  }
`
