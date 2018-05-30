import gql from 'graphql-tag'

export default gql`
  mutation createPrompt(
    $title: String!,
    $tagline: String!,
    $description: String!,
    $suggestedLaunchDate: DateTime
  ) {
    createPrompt(
      title: $title,
      tagLine: $tagline,
      description: $description,
      suggestedLaunchDate: $suggestedLaunchDate
    ) {
        id
      }
    }
`
