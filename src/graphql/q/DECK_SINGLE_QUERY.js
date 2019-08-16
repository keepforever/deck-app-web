import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';
import USER_FRAGMENT from '../f/USER_FRAGMENT';

export default gql`
  query($id: ID!) {
        singleDeck(id: $id) {
      ...DeckInfo
      author {
        ...UserInfo
      }
    }
  }
  ${DECK_FRAGMENT}
  ${USER_FRAGMENT}
`;
