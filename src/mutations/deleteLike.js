import gql from 'graphql-tag'

export default gql`
  mutation deleteLike($id: ID!) {
    deleteLike(id: $id) {
      id
    }
  }
`
