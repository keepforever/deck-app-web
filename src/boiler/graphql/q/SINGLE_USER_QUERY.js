import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';
import USER_FRAGMENT from '../f/USER_FRAGMENT';


export default gql`
  query ($userId: ID! ) {
    singleUser (userId: $userId) {
      ...UserInfo
      decks{
        ...DeckInfo
      }
    }
  }
  ${DECK_FRAGMENT}
  ${USER_FRAGMENT}
`;
