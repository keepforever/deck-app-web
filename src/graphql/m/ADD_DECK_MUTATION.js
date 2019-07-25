import gql from "graphql-tag";

export default gql`
  mutation(
    $deckList: String!,
    $deckDetails: String!,
    $deckName: String!
  ) {
    addDeck(
      deckName: $deckName,
      deckList: $deckList,
      deckDetails: $deckDetails,
    )
  }
`;
