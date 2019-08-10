import gql from 'graphql-tag';

export default gql`
  fragment DeckInfo on Deck {
    id
    title
    list
    altList
    altCard
    author {
        id
        arenaHandle
    }
  }
`;
