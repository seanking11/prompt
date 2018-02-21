import gql from 'graphql-tag'

export default gql`
  mutation createUserQuery ($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
      createdAt
    }
  }
`
