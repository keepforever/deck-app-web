import gql from 'graphql-tag';
import DECK_FRAGMENT from './DECK_FRAGMENT';

export default gql`
    fragment UserInfo on User {
        id
        arenaHandle
        name
        email
        decks {
            ...DeckInfo
        }
    }
    ${DECK_FRAGMENT}
`;
