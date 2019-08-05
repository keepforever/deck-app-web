import gql from 'graphql-tag';

export default gql`
  fragment DeckInfo on Deck {
    id
    deckName
    deckDetails
    deckList
    score
    raw
  }
`;
