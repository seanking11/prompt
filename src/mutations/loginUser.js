import gql from 'graphql-tag'

export default gql`
  mutation signinUserQuery($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        id
        createdAt
        email
        firstName
        lastName
      }
    }
  }
`
