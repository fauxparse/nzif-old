import gql from 'graphql-tag'

export default gql`
  mutation sendMessage(
    $messageableType: String!,
    $messageableId: ID!,
    $subject: String!,
    $body: String!
  ) {
    createMessage(
      messageableType: $messageableType,
      messageableId: $messageableId,
      subject: $subject,
      body: $body
    ) {
      id
      subject
      body
      createdAt
    }
  }
`