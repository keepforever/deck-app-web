import gql from "graphql-tag";

export default gql`
  mutation ($deckId: ID!, $quality: Boolean!) {
    upVoteDeck(
      quality: $quality,
      deckId: $deckId
    )
  }
`;
