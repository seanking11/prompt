import gql from 'graphql-tag'

export default gql`
  query($promptLaunchDate: DateTime!) {
    Prompt(promptLaunchDate: $promptLaunchDate) {
      id
      title
      description
    }
  }
`
